#!/usr/bin/env python3
"""
CSV/TSV to YAML Converter

This script converts CSV or TSV files to YAML format.
It automatically detects the delimiter based on file extension or content analysis.

Usage:
    python csv_to_yaml.py input_file [output_file]

Arguments:
    input_file: Path to the input CSV or TSV file
    output_file: (Optional) Path to the output YAML file. If not provided,
                 output will be saved with the same name as input but with .yaml extension.

Example:
    python csv_to_yaml.py data.csv
    python csv_to_yaml.py data.tsv output.yaml
"""

import csv
import yaml
import sys
import os

xwalk = [
    {"SystemIdentifier": "NL110YB4", "RecordID": "2KXJ8ZBQOGAX"},
    {"SystemIdentifier": "NL110YLP", "RecordID": "2KXJ8ZBQ2XUP"},
    {"SystemIdentifier": "NL110Z4M", "RecordID": "2KXJ8ZBBDRKW"},
    {"SystemIdentifier": "NL110ZVW", "RecordID": "2KXJ8ZB351FG"},
    {"SystemIdentifier": "NL11107J", "RecordID": "2KXJ8ZB3Q5JC"},
    {"SystemIdentifier": "NL1110CO", "RecordID": "2KXJ8ZB3HW70"},
    {"SystemIdentifier": "NL1110EK", "RecordID": "2KXJ8ZB3JZCS"},
    {"SystemIdentifier": "NL1110MC", "RecordID": "2KXJ8ZB3GXOA"},
    {"SystemIdentifier": "NL1110WY", "RecordID": "2KXJ8ZBVK4NC"},
    {"SystemIdentifier": "NL1111BW", "RecordID": "2KXJ8ZBV628C"},
    {"SystemIdentifier": "NL1111DE", "RecordID": "2KXJ8ZBVG54Y"},
    {"SystemIdentifier": "NL1111S0", "RecordID": "2KXJ8ZBVIYK6"},
    {"SystemIdentifier": "NL11123T", "RecordID": "2KXJ8ZBFRRTT"},
    {"SystemIdentifier": "NL111245", "RecordID": "2KXJ8ZBFRUVS"},
    {"SystemIdentifier": "NL1112PU", "RecordID": "2KXJ8ZBF4PY3"},
    {"SystemIdentifier": "NL11639U", "RecordID": "2KXJ8ZRDY801"},
    {"SystemIdentifier": "NL11675J", "RecordID": "2KXJ8ZFLB0XM"},
    {"SystemIdentifier": "NL11A1A0", "RecordID": "2KXJ8ZS6OVN9I"},
    {"SystemIdentifier": "NL11A1B1", "RecordID": "2KXJ8ZS6ON4F1"},
    {"SystemIdentifier": "NL11A1QC", "RecordID": "2KXJ8ZS6OH7CQ"},
    {"SystemIdentifier": "NL11A2DT", "RecordID": "2KXJ8ZS6YROY3"},
    {"SystemIdentifier": "NL11A3TJ", "RecordID": "2KXJ8ZS67B3VP"},
    {"SystemIdentifier": "NL11A4CB", "RecordID": "2KXJ8ZS6BEP09"},
    {"SystemIdentifier": "NL11A73E", "RecordID": "2KXJ8ZS6TBBJJ"},
    {"SystemIdentifier": "NL11A79D", "RecordID": "2KXJ8ZS6T6JYH"},
    {"SystemIdentifier": "NL11A7BD", "RecordID": "2KXJ8ZS6R3R3R"},
    {"SystemIdentifier": "NL11A8WM", "RecordID": "2KXJ8ZS6KS7L2"},
    {"SystemIdentifier": "NL11AGIK", "RecordID": "2KXJ8ZS6JZ59Z"},
    {"SystemIdentifier": "NL11AZA3", "RecordID": "2KXJ8ZS2YKBG3"},
    {"SystemIdentifier": "NL11AZNU", "RecordID": "2KXJ8ZS2VJ91G"},
    {"SystemIdentifier": "NL11BMYS", "RecordID": "2KXJ8ZS2XTIN9"},
    {"SystemIdentifier": "NL11CI8T", "RecordID": "2KXJ8ZSU9J13U"},
    {"SystemIdentifier": "NL11DGUP", "RecordID": "2KXJ8ZSGXKYSP"},
    {"SystemIdentifier": "NL11DGYG", "RecordID": "2KXJ8ZSGXHPFW"},
    {"SystemIdentifier": "NL11DGYX", "RecordID": "2KXJ8ZSGXHVOK"},
    {"SystemIdentifier": "NL11DHA7", "RecordID": "2KXJ8ZSGXW0YK"},
    {"SystemIdentifier": "NL11DI5L", "RecordID": "2KXJ8ZSGSZRW0"},
    {"SystemIdentifier": "NL11ET2P", "RecordID": "2KXJ8ZSJHXTIN"},
    {"SystemIdentifier": "NL11ET4H", "RecordID": "2KXJ8ZSJHU53A"},
    {"SystemIdentifier": "NL11FDAE", "RecordID": "2KXJ8ZSVKCBT8"},
    {"SystemIdentifier": "NL11FDDN", "RecordID": "2KXJ8ZSVKRU1K"},
    {"SystemIdentifier": "NL11FDDW", "RecordID": "2KXJ8ZSVKJFU4"},
    {"SystemIdentifier": "NL11FDE2", "RecordID": "2KXJ8ZSVKIFN4"},
    {"SystemIdentifier": "NL11FDER", "RecordID": "2KXJ8ZSVKJRVQ"},
    {"SystemIdentifier": "NL11FDK4", "RecordID": "2KXJ8ZSVKXG6W"},
    {"SystemIdentifier": "NL11FDPI", "RecordID": "2KXJ8ZSVK6BG8"},
    {"SystemIdentifier": "NL11FDXQ", "RecordID": "2KXJ8ZSVRH3O5"},
    {"SystemIdentifier": "NL11FE19", "RecordID": "2KXJ8ZSVRTSQK"},
    {"SystemIdentifier": "NL11FE59", "RecordID": "2KXJ8ZSVREC41"},
    {"SystemIdentifier": "NL11FE79", "RecordID": "2KXJ8ZSVRYUG4"},
    {"SystemIdentifier": "NL11FEAL", "RecordID": "2KXJ8ZSVRNLR2"},
    {"SystemIdentifier": "NL11FEG8", "RecordID": "2KXJ8ZSVR0UJ4"},
    {"SystemIdentifier": "NL11FEHG", "RecordID": "2KXJ8ZSVRIFC5"},
    {"SystemIdentifier": "NL11FEI0", "RecordID": "2KXJ8ZSVRIRIR"},
    {"SystemIdentifier": "NL11FEKH", "RecordID": "2KXJ8ZSVRGDNU"},
    {"SystemIdentifier": "NL11FEMV", "RecordID": "2KXJ8ZSVRMWGU"},
    {"SystemIdentifier": "NL11FERQ", "RecordID": "2KXJ8ZSVRAOT9"},
    {"SystemIdentifier": "NL11FFNK", "RecordID": "2KXJ8ZSVYJXUT"},
    {"SystemIdentifier": "NL11FG6H", "RecordID": "2KXJ8ZSV04BEV"},
    {"SystemIdentifier": "NL11FG7H", "RecordID": "2KXJ8ZSV0XUVH"},
    {"SystemIdentifier": "NL11FGEN", "RecordID": "2KXJ8ZSV0P0P0"},
    {"SystemIdentifier": "NL11FGG8", "RecordID": "2KXJ8ZSV0C5QE"},
    {"SystemIdentifier": "NL11FGTA", "RecordID": "2KXJ8ZSV0MKOH"},
    {"SystemIdentifier": "NL11FGU7", "RecordID": "2KXJ8ZSV0WW33"},
    {"SystemIdentifier": "NL11FGU9", "RecordID": "2KXJ8ZSV0MNEG"},
    {"SystemIdentifier": "NL11FGYW", "RecordID": "2KXJ8ZSV0DMQL"},
    {"SystemIdentifier": "NL11FGZD", "RecordID": "2KXJ8ZSV0D0D0"},
    {"SystemIdentifier": "NL11FH1N", "RecordID": "2KXJ8ZSV06GNY"},
    {"SystemIdentifier": "NL11FHEN", "RecordID": "2KXJ8ZSVT0QR0"},
    {"SystemIdentifier": "NL11FHUR", "RecordID": "2KXJ8ZSVT3W9M"},
    {"SystemIdentifier": "NL11FHV2", "RecordID": "2KXJ8ZSVTQV1S"},
    {"SystemIdentifier": "NL11FHV7", "RecordID": "2KXJ8ZSVTO0WS"},
    {"SystemIdentifier": "NL11FIIV", "RecordID": "2KXJ8ZSV27EF4"},
    {"SystemIdentifier": "NL11FIJC", "RecordID": "2KXJ8ZSV2JUV1"},
    {"SystemIdentifier": "NL11FIVI", "RecordID": "2KXJ8ZSV21E64"},
    {"SystemIdentifier": "NL11FIWU", "RecordID": "2KXJ8ZSV21ST9"},
    {"SystemIdentifier": "NL11FJ4W", "RecordID": "2KXJ8ZSV26Z9R"},
    {"SystemIdentifier": "NL11FJ55", "RecordID": "2KXJ8ZSV2GN1W"},
    {"SystemIdentifier": "NL11FJ7H", "RecordID": "2KXJ8ZSV2MF4U"},
    {"SystemIdentifier": "NL11FJ8B", "RecordID": "2KXJ8ZSV2M8G5"},
    {"SystemIdentifier": "NL11FJB0", "RecordID": "2KXJ8ZSV2QR78"},
    {"SystemIdentifier": "NL11FJCE", "RecordID": "2KXJ8ZSV2QCFX"},
    {"SystemIdentifier": "NL11FJG0", "RecordID": "2KXJ8ZSV8WB2K"},
    {"SystemIdentifier": "NL11FJGM", "RecordID": "2KXJ8ZSV8X9Q1"},
    {"SystemIdentifier": "NL11FJGY", "RecordID": "2KXJ8ZSV8W6M4"},
    {"SystemIdentifier": "NL11FJPY", "RecordID": "2KXJ8ZSV88JJI"},
    {"SystemIdentifier": "NL11FK0M", "RecordID": "2KXJ8ZSV8RX18"},
    {"SystemIdentifier": "NL11FK6Z", "RecordID": "2KXJ8ZSV8BKXO"},
    {"SystemIdentifier": "NL11FKEL", "RecordID": "2KXJ8ZSV8N4GP"},
    {"SystemIdentifier": "NL11JQQT", "RecordID": "2KXJ8ZSFZNXW0"},
    {"SystemIdentifier": "NL11JRV0", "RecordID": "2KXJ8ZSFFX1LT"},
    {"SystemIdentifier": "NL11JRV6", "RecordID": "2KXJ8ZSFFXYIM"},
    {"SystemIdentifier": "NL11JRVY", "RecordID": "2KXJ8ZSFFKXYN"},
    {"SystemIdentifier": "NL11JRWF", "RecordID": "2KXJ8ZSFFXFXF"},
    {"SystemIdentifier": "NL11JSBT", "RecordID": "2KXJ8ZSF9Q3FO"},
    {"SystemIdentifier": "NL11JVLN", "RecordID": "2KXJ8ZSFQEF1B"},
    {"SystemIdentifier": "NL11JVLY", "RecordID": "2KXJ8ZSFQNVBR"},
    {"SystemIdentifier": "NL11JY9N", "RecordID": "2KXJ8ZSFWS0B5"},
    {"SystemIdentifier": "NL11JZZA", "RecordID": "2KXJ8ZSFUQNFP"},
    {"SystemIdentifier": "NL11K01E", "RecordID": "2KXJ8ZSFURVT8"},
    {"SystemIdentifier": "NL11K01F", "RecordID": "2KXJ8ZSFUR2KI"},
    {"SystemIdentifier": "NL11LUYB", "RecordID": "2KXJ8ZSA1PD2K"},
    {"SystemIdentifier": "NL11LV0V", "RecordID": "2KXJ8ZSA1PHVW"},
    {"SystemIdentifier": "NL11LV1P", "RecordID": "2KXJ8ZSA80Y97"},
    {"SystemIdentifier": "NL11LV1S", "RecordID": "2KXJ8ZSA806P4"},
    {"SystemIdentifier": "NL11LX7K", "RecordID": "2KXJ8ZSAVIIYY"},
    {"SystemIdentifier": "NL11LYL1", "RecordID": "2KXJ8ZSCYETG0"},
    {"SystemIdentifier": "NL11M0I6", "RecordID": "2KXJ8ZSC7OQ7U"},
    {"SystemIdentifier": "NL11M0NZ", "RecordID": "2KXJ8ZSC7WDOB"},
    {"SystemIdentifier": "NL11M0Q1", "RecordID": "2KXJ8ZSC76G71"},
    {"SystemIdentifier": "NL11M0Z2", "RecordID": "2KXJ8ZSC7SSOO"},
    {"SystemIdentifier": "NL11M1A4", "RecordID": "2KXJ8ZSC703BP"},
    {"SystemIdentifier": "NL11M1D0", "RecordID": "2KXJ8ZSC7RRII"},
    {"SystemIdentifier": "NL11M2JY", "RecordID": "2KXJ8ZSCHMX8M"},
    {"SystemIdentifier": "NL11ZN0S", "RecordID": "2KXJ8ZSR1AZ14"},
    {"SystemIdentifier": "NL128WQ7", "RecordID": "2KXJ8ZS9C6SJL"},
    {"SystemIdentifier": "NL12JBUT", "RecordID": "2KXJ8ZSLOJYIR"},
    {"SystemIdentifier": "NL12JBW5", "RecordID": "2KXJ8ZSLOHYDR"},
    {"SystemIdentifier": "NL12KG86", "RecordID": "2KXJ8ZSEXVC72"},
    {"SystemIdentifier": "NL14FF1", "RecordID": "2KXJ8Z7N1HQ3"},
    {"SystemIdentifier": "NL14FU2", "RecordID": "2KXJ8Z7NSBUC"},
    {"SystemIdentifier": "NL15HBZ", "RecordID": "2KXJ8ZA6BUJY"},
    {"SystemIdentifier": "NL15HEF", "RecordID": "2KXJ8ZA6T5PF"},
    {"SystemIdentifier": "NL15HEI", "RecordID": "2KXJ8ZA6TVHN"},
    {"SystemIdentifier": "NL15MWD", "RecordID": "2KXJ8ZAU3WZR"},
    {"SystemIdentifier": "NL15NEK", "RecordID": "2KXJ8ZA93MWP"},
    {"SystemIdentifier": "NL15NSH", "RecordID": "2KXJ8ZA9T091"},
    {"SystemIdentifier": "NL15NWF", "RecordID": "2KXJ8ZA97WI4"},
    {"SystemIdentifier": "NL15O35", "RecordID": "2KXJ8ZA9FDT4"},
    {"SystemIdentifier": "NL15O9W", "RecordID": "2KXJ8ZAKD58D"},
    {"SystemIdentifier": "NL15PBQ", "RecordID": "2KXJ8ZA0AGMY"},
    {"SystemIdentifier": "NL15PIP", "RecordID": "2KXJ8ZA0XRTS"},
    {"SystemIdentifier": "NL15PKH", "RecordID": "2KXJ8ZA0S91T"},
    {"SystemIdentifier": "NL15PO9", "RecordID": "2KXJ8ZA07Z5M"},
    {"SystemIdentifier": "NL15POA", "RecordID": "2KXJ8ZA07QLT"},
    {"SystemIdentifier": "NL15Q26", "RecordID": "2KXJ8ZA0YZNM"},
    {"SystemIdentifier": "NL15Q5T", "RecordID": "2KXJ8ZA0W96T"},
    {"SystemIdentifier": "NL19UWX", "RecordID": "2KXJ8ZQXUYJP"},
    {"SystemIdentifier": "NL1BD6F", "RecordID": "2KXJ8ZO2XCSX"},
    {"SystemIdentifier": "NL1BZIV", "RecordID": "2KXJ8ZY6A98M"},
    {"SystemIdentifier": "NL1BZPH", "RecordID": "2KXJ8ZY6TGF3"},
    {"SystemIdentifier": "NL1FUUS", "RecordID": "2KXJ8ZJV4Z9H"},
    {"SystemIdentifier": "NL1FUXI", "RecordID": "2KXJ8ZJVI3WN"},
    {"SystemIdentifier": "NL1FUZU", "RecordID": "2KXJ8ZJVZQDG"},
    {"SystemIdentifier": "NL1FV08", "RecordID": "2KXJ8ZJVZGCE"},
    {"SystemIdentifier": "NL1FVBA", "RecordID": "2KXJ8ZJRKLE2"},
    {"SystemIdentifier": "NL1FVBV", "RecordID": "2KXJ8ZJRKXQW"},
    {"SystemIdentifier": "NL1FWN0", "RecordID": "2KXJ8ZJHH00Z"},
    {"SystemIdentifier": "NL1FWOY", "RecordID": "2KXJ8ZJH8H8H"},
    {"SystemIdentifier": "NL1FXUZ", "RecordID": "2KXJ8ZJ209ZD"},
    {"SystemIdentifier": "NL1FY84", "RecordID": "2KXJ8ZJ2ESW9"},
    {"SystemIdentifier": "NL1FZ62", "RecordID": "2KXJ8ZJ18E6B"},
    {"SystemIdentifier": "NL1G2QU", "RecordID": "2KXJ8ZJ7WR9I"},
    {"SystemIdentifier": "NL1G31E", "RecordID": "2KXJ8ZJ74O14"},
    {"SystemIdentifier": "NL1G34A", "RecordID": "2KXJ8ZJ7S9HU"},
    {"SystemIdentifier": "NL1G3BZ", "RecordID": "2KXJ8ZJ7RMLQ"},
    {"SystemIdentifier": "NL1G3HB", "RecordID": "2KXJ8ZJ7EZPD"},
    {"SystemIdentifier": "NL1M32O", "RecordID": "2KXJ8ZII5ANO"},
    {"SystemIdentifier": "NL1M48W", "RecordID": "2KXJ8ZISQRT0"},
    {"SystemIdentifier": "NL1M4J9", "RecordID": "2KXJ8ZISOOGG"},
    {"SystemIdentifier": "NL1M4W3", "RecordID": "2KXJ8ZIS9WAJ"},
    {"SystemIdentifier": "NL1M50D", "RecordID": "2KXJ8ZISB1N0"},
    {"SystemIdentifier": "NL1NNUP", "RecordID": "2KXJ8Z3KY384"},
    {"SystemIdentifier": "NL1NNUW", "RecordID": "2KXJ8Z3KYUEK"},
    {"SystemIdentifier": "NL1NNVE", "RecordID": "2KXJ8Z3KYN17"},
    {"SystemIdentifier": "NL1NO63", "RecordID": "2KXJ8Z3AWPGV"},
    {"SystemIdentifier": "NL1NSW0", "RecordID": "2KXJ8Z36GLVE"},
    {"SystemIdentifier": "NL1NSXZ", "RecordID": "2KXJ8Z366HHS"},
    {"SystemIdentifier": "NL1NT14", "RecordID": "2KXJ8Z364J8Z"},
    {"SystemIdentifier": "NL1OIP2", "RecordID": "2KXJ8ZEEGZY6"},
    {"SystemIdentifier": "NL1OR2G", "RecordID": "2KXJ8ZELUVOM"},
    {"SystemIdentifier": "NL1OSBO", "RecordID": "2KXJ8ZEPAS8B"},
    {"SystemIdentifier": "NL1OSX3", "RecordID": "2KXJ8ZEP5LMW"},
    {"SystemIdentifier": "NL1OTMO", "RecordID": "2KXJ8ZE0KHBL"},
    {"SystemIdentifier": "NL1OTWW", "RecordID": "2KXJ8ZE0DS7F"},
    {"SystemIdentifier": "NL1OTZA", "RecordID": "2KXJ8ZE0LNSG"},
    {"SystemIdentifier": "NL1OU6U", "RecordID": "2KXJ8ZE9XWB4"},
    {"SystemIdentifier": "NL1OU7E", "RecordID": "2KXJ8ZE931MU"},
    {"SystemIdentifier": "NL1PYRO", "RecordID": "2KXJ8Z18ZMKX"},
    {"SystemIdentifier": "NL1PZBW", "RecordID": "2KXJ8Z15X95O"},
    {"SystemIdentifier": "NL1V6U5", "RecordID": "2KXJ8ZWANQ9N"},
    {"SystemIdentifier": "NL1W22B", "RecordID": "2KXJ8ZNI1D4X"},
    {"SystemIdentifier": "NL1W22G", "RecordID": "2KXJ8ZNI14QU"},
    {"SystemIdentifier": "NL1W22P", "RecordID": "2KXJ8ZNI1H02"},
    {"SystemIdentifier": "NL1W2DI", "RecordID": "2KXJ8ZN34F23"},
    {"SystemIdentifier": "NL1Z4TC", "RecordID": "2KXJ8Z2UFVR8"},
    {"SystemIdentifier": "NL1Z7ZE", "RecordID": "2KXJ8Z2NTNTN"},
    {"SystemIdentifier": "NL1Z826", "RecordID": "2KXJ8Z2NFR8L"},
    {"SystemIdentifier": "NL1Z841", "RecordID": "2KXJ8Z2NHI4M"},
]


def disgusting_hack_do_not_use(data):
    for datum in data:
        sysid = datum["UI"]
        for x in xwalk:
            if x["SystemIdentifier"] == sysid:
                datum["mei"] = x["RecordID"]
    return data


def detect_delimiter(file_path, sample_size=1024):
    """
    Detect the delimiter used in a CSV/TSV file.
    First tries to use file extension, then falls back to analyzing content.
    """
    # Check file extension first
    if file_path.lower().endswith(".tsv"):
        return "\t"
    elif file_path.lower().endswith(".csv"):
        return ","

    # If extension doesn't tell us, analyze the file content
    with open(file_path, "r", newline="", encoding="utf-8") as file:
        sample = file.read(sample_size)

        # Count occurrences of common delimiters
        tab_count = sample.count("\t")
        comma_count = sample.count(",")
        semicolon_count = sample.count(";")
        pipe_count = sample.count("|")

        # Find the most common delimiter
        delimiters = {
            "\t": tab_count,
            ",": comma_count,
            ";": semicolon_count,
            "|": pipe_count,
        }

        most_common = max(delimiters, key=delimiters.get)

        # If the most common delimiter appears a reasonable number of times
        if delimiters[most_common] > 3:
            return most_common
        else:
            # Default to comma if unsure
            return ","


def csv_to_yaml(input_file, output_file=None):
    """
    Convert a CSV/TSV file to YAML format.
    """
    # Determine output file name if not provided
    if output_file is None:
        base_name = os.path.splitext(input_file)[0]
        output_file = f"{base_name}.yaml"

    # Detect delimiter
    delimiter = detect_delimiter(input_file)

    # Read CSV/TSV file
    data = []
    with open(input_file, "r", newline="", encoding="utf-8") as csv_file:
        reader = csv.DictReader(csv_file, delimiter=delimiter)
        for row in reader:
            # Clean up empty values
            cleaned_row = {k: (v if v else None) for k, v in row.items()}

            data.append(cleaned_row)

    data = disgusting_hack_do_not_use(data)

    # Write YAML file
    with open(output_file, "w", encoding="utf-8") as yaml_file:
        yaml.dump(
            data,
            yaml_file,
            default_flow_style=False,
            sort_keys=False,
            allow_unicode=True,
        )

    print(f"Conversion successful! YAML file saved as: {output_file}")
    return output_file


def main():
    # Parse command line arguments
    if len(sys.argv) < 2:
        print("Error: Input file is required")
        print(__doc__)
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None

    # Check if input file exists
    if not os.path.isfile(input_file):
        print(f"Error: Input file '{input_file}' not found")
        sys.exit(1)

    # Perform conversion
    try:
        output_file = csv_to_yaml(input_file, output_file)
        print(f"CSV/TSV to YAML conversion complete!")
    except Exception as e:
        print(f"Error during conversion: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()
