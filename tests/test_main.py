import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from app.main import app  # Now Python can find your app module
from fastapi.testclient import TestClient
from bs4 import BeautifulSoup
client = TestClient(app)

def test_root_endpoint():
    """Test the root endpoint '/' is accessible"""
    response = client.get("/")
    assert response.status_code == 200

def test_mss_endpoint():
    """Test the /mss endpoint is accessible"""
    response = client.get("/mss")
    assert response.status_code == 200

def test_ms_endpoints():
    """Test accessing a specific manuscript endpoint and its HTML content"""
    ms_id = "141141-1"
    response = client.get(f"/ms/{ms_id}")
    assert response.status_code == 200
    
    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Test whether the ms table query suceeded
    assert soup.title is not None, "Page should have a title"
    
    # Test whether the page table query suceeded
    # a ms must have more than 3 pages
    pages_list = soup.find('section', class_='cards') 
    assert pages_list is not None, "Cards section should exist"
    
    # Count the pages
    pages = pages_list.find_all('a')  
    assert len(pages) > 3, f"Expected more than 3 pages, found {len(pages)}"
    
    manuscript_title = soup.find('h1') 
    assert manuscript_title.text.strip() != "", "Title should not be empty"

def test_invalid_ms_id():
    """Test behavior with an invalid manuscript ID"""
    response = client.get("/ms/invalid-id")
    assert response.status_code == 404 

# need tests for page/page image, page input, data submission, etc
