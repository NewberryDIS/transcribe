# app/utils/markdown_handler.py
import os
import markdown
from bs4 import BeautifulSoup
from typing import Optional

class MarkdownHandler:
    def __init__(self, content_dir: str = "jenfiles"):
        self.content_dir = content_dir
        self._cache = {}  

    def interpret_content(self, emdee: str) -> str:
        html = markdown.markdown(emdee)
        return html


    def get_content(self, filename: str, emdee = markdown) -> str:
        # Optional: Check cache first
        if filename in self._cache:
            return self._cache[filename]

        markdown_path = os.path.join(self.content_dir, filename)
        if os.path.exists(markdown_path):
            with open(markdown_path, 'r') as file:
                content = file.read()
                html = emdee.markdown(content, extensions=['toc', 'attr_list', 'nl2br', 'md_in_html'], extension_configs={'toc': {'toc_depth': 2}})
                soup = BeautifulSoup(html, 'html.parser')
                for ul in soup.find_all('ul'):
                    ul['role'] = 'list'
                    for img in ul.findChildren('img'):
                        img.parent.parent['class'] = 'li-img'
                for anchor in soup.find_all('a'):
                    if anchor['href'].startswith('http'):
                        anchor['target'] = '_blank'
                toc_div = soup.find('div', class_='toc')
                if toc_div:
                    wrapper = soup.new_tag("div", **{'class':'md-content'})
                    children = list(soup.children)
                    soup.clear()
                    soup.append(toc_div)
                    soup.append(wrapper)
                    for child in children[1:]:
                        wrapper.append(child)
                processed_content = str(soup)
                
                # Optional: Cache the result
                # self._cache[filename] = processed_content
                return processed_content
        return ""

    def get_menus(self) -> tuple[str, str]:
        """Get both header and footer menus."""
        header = self.get_content("header_menu.md",markdown)
        footer = self.get_content("footer_menu.md")
        return header, footer
    
    def get_quick_tips(self) ->  Optional[str]:
        """Get qiuck tips, which has special formatting needs."""
        markdown_path = os.path.join(self.content_dir, "quick_tips.md")

        if os.path.exists(markdown_path):
            with open(markdown_path, 'r') as file:
                content = file.read()
                html = markdown.markdown(content)
                soup = BeautifulSoup(html, 'html.parser')
                for anchor in soup.find_all('a'):
                    anchor['class'] = 'llines'
                    if anchor['href'].startswith('http'):
                        anchor['target'] = '_blank'
                processed_content = str(soup)
                
                # Optional: Cache the result
                self._cache["quick_tips.md"] = processed_content
                return processed_content
