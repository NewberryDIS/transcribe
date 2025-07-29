# app/utils/markdown_handler.py
import os
import markdown
import yaml
from bs4 import BeautifulSoup
from typing import Optional


class MarkdownHandler:
    def __init__(self, content_dir: str = "jenfiles"):
        self.content_dir = content_dir
        self._cache = {}

    def interpret_content(self, emdee: str) -> str:
        html = markdown.markdown(emdee)
        return html

    def get_content(self, filename: str) -> tuple:
        # Optional: Check cache first
        if filename in self._cache:
            return self._cache[filename]

        markdown_path = os.path.join(self.content_dir, filename)
        if os.path.exists(markdown_path):
            with open(markdown_path, "r") as file:
                content = file.read()
                if content.startswith('---'):
                    parts = content.split('---', 2)
                    frontmatter = yaml.safe_load(parts[1])
                    markdown_content = parts[2].strip()
                else:
                    frontmatter = {}
                    markdown_content = content

                # Create a Markdown instance instead of using the function
                md = markdown.Markdown(
                    extensions=["toc", "attr_list", "nl2br", "md_in_html"],
                    extension_configs={"toc": {"toc_depth": 2}},
                )
                
                # Convert the markdown content
                html = md.convert(markdown_content)
                
                # Now you can access the TOC
                toc_html = md.toc
                
                # Continue with your BeautifulSoup processing
                soup = BeautifulSoup(html, "html.parser")
                for ul in soup.find_all("ul"):
                    ul["role"] = "list"
                    for img in ul.findChildren("img"):
                        img.parent.parent["class"] = "li-img"
                for anchor in soup.find_all("a"):
                    if anchor.get("href", "").startswith("http"):
                        anchor["target"] = "_blank"
                processed_content = str(soup)

                # Return frontmatter, content, and TOC
                result = (frontmatter, processed_content, toc_html)
                
                # Cache the result -- implement when not dev
                # self._cache[filename] = result
                return result
        return ({}, "", "")

    def get_menus(self) -> tuple[str, str]:
        """Get both header and footer menus."""
        header = self.get_content("header_menu.md")
        footer = self.get_content("footer_menu.md")
        return header, footer

    def get_quick_tips(
        self, filename: Optional[str] = "quick_tips.md"
    ) -> Optional[str]:
        """Get qiuck tips, which has special formatting needs."""
        markdown_path = os.path.join(self.content_dir, filename)

        if os.path.exists(markdown_path):
            with open(markdown_path, "r") as file:
                content = file.read()
                html = markdown.markdown(content)
                soup = BeautifulSoup(html, "html.parser")
                for anchor in soup.find_all("a"):
                    anchor["class"] = "link-lines"
                    if anchor["href"].startswith("http"):
                        anchor["target"] = "_blank"
                processed_content = str(soup)

                # Optional: Cache the result
                self._cache[filename] = processed_content
                return processed_content
