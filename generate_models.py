from sqlalchemy import create_engine, MetaData, inspect
from typing import Optional
from pydantic import create_model
import black
import isort

def generate_models(database_url: str, output_file: str = "models.py"):
    engine = create_engine(database_url)
    metadata = MetaData()
    metadata.reflect(bind=engine)
    
    # Start building our output file content
    output = [
        "from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Float, Text",
        "from sqlalchemy.orm import declarative_base, relationship",
        "from pydantic import BaseModel",
        "from typing import Optional, List",
        "\nBase = declarative_base()\n\n"
    ]
    
    # Generate SQLAlchemy models
    for table_name, table in metadata.tables.items():
        class_name = "".join(word.title() for word in table_name.split("_"))
        model_lines = [f"class {class_name}(Base):"]
        model_lines.append(f"    __tablename__ = '{table_name}'")
        
        for column in table.columns:
            # Get column type
            col_type = str(column.type)
            if "INTEGER" in col_type.upper():
                sa_type = "Integer"
            elif "VARCHAR" in col_type.upper() or "TEXT" in col_type.upper():
                sa_type = "String"
            elif "TIMESTAMP" in col_type.upper() or "DATETIME" in col_type.upper():
                sa_type = "DateTime"
            elif "BOOLEAN" in col_type.upper():
                sa_type = "Boolean"
            elif "FLOAT" in col_type.upper() or "NUMERIC" in col_type.upper():
                sa_type = "Float"
            else:
                sa_type = "String"  # default to String for unknown types
            
            # Build column definition
            col_def = f"    {column.name} = Column({sa_type}"
            if column.primary_key:
                col_def += ", primary_key=True"
            if not column.nullable:
                col_def += ", nullable=False"
            if column.foreign_keys:
                fk = list(column.foreign_keys)[0]
                col_def += f", ForeignKey('{fk.target_fullname}')"
            col_def += ")"
            model_lines.append(col_def)
        
        # Add relationships
        inspector = inspect(engine)
        for fk in inspector.get_foreign_keys(table_name):
            referred_table = fk['referred_table']
            referred_class = "".join(word.title() for word in referred_table.split("_"))
            relationship_name = referred_table.lower()
            model_lines.append(f"    {relationship_name} = relationship('{referred_class}')")
        
        output.extend(model_lines + ["\n"])

        # Generate corresponding Pydantic model
        pydantic_lines = [f"class {class_name}Model(BaseModel):"]
        for column in table.columns:
            python_type = column.type.python_type
            if column.nullable:
                python_type = f"Optional[{python_type.__name__}]"
            else:
                python_type = python_type.__name__
            pydantic_lines.append(f"    {column.name}: {python_type}")
        
        pydantic_lines.extend([
            "\n    class Config:",
            "        orm_mode = True\n"
        ])
        output.extend(pydantic_lines + ["\n"])
    
    # Write to file
    with open(output_file, "w") as f:
        f.write("\n".join(output))
    
    # Format with black and isort
    try:
        with open(output_file, "r") as f:
            content = f.read()
        
        # Format with isort
        sorted_content = isort.code(content)
        
        # Format with black
        formatted_content = black.format_str(sorted_content, mode=black.FileMode())
        
        with open(output_file, "w") as f:
            f.write(formatted_content)
    except Exception as e:
        print(f"Warning: Formatting failed: {e}")

# Usage example:
if __name__ == "__main__":
    database_url = ""
    generate_models(database_url, "models.py")
