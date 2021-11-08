import sqlite3
from bs4 import BeautifulSoup
from PIL import Image, UnidentifiedImageError
from io import BytesIO
import re
import base64
from datetime import datetime, timezone
import os
import argparse


"""
Imports html bookmarks file into Flame.
Tested only on Firefox html exports so far.

Usage:
python3 bookmarks_importer.py --bookmarks <path to bookmarks file> --data <path to flame data dir>

"""

parser = argparse.ArgumentParser()
parser.add_argument('--bookmarks', type=str, required=True)
parser.add_argument('--data', type=str, required=True)
args = parser.parse_args()

bookmarks_path = args.bookmarks
data_path      = args.data
created        = datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')[:-3] + datetime.now().astimezone().strftime(" %z")
updated        = created
if data_path[-1] != '/':
	data_path = data_path + '/'




def Base64toPNG(codec, name):

	"""
	Convert base64 encoded image to png file
	Reference: https://github.com/python-pillow/Pillow/issues/3400#issuecomment-428104239

		Parameters:
			codec (str): icon in html bookmark format.e.g. 'data:image/png;base64,<image encoding>'
			name (str): name for export file

		Returns:
			icon_name(str): name of png output E.g. 1636473849374--mybookmark.png
			None: if image not produced successfully

	"""

	try:
		unix_t     = str(int(datetime.now(tz=timezone.utc).timestamp() * 1000))
		icon_name  = unix_t + '--' + re.sub(r'\W+', '', name).lower() + '.png'
		image_path = data_path + 'uploads/' + icon_name
		if os.path.exists(image_path):
			return image_path
		base64_data = re.sub('^data:image/.+;base64,', '', codec)
		byte_data   = base64.b64decode(base64_data)
		image_data  = BytesIO(byte_data)
		img         = Image.open(image_data)
		img.save(image_path, "PNG")
		return icon_name
	except UnidentifiedImageError:
		return None




def FlameBookmarkParser(bookmarks_path):

	"""
	Parses HTML bookmarks file
	Reference: https://stackoverflow.com/questions/68621107/extracting-bookmarks-and-folder-hierarchy-from-google-chrome-with-beautifulsoup

		Parameters:
			bookmarks_path (str): path to bookmarks.html

		Returns:
			None

	"""

	soup = BeautifulSoup()
	with open(bookmarks_path) as f:
        	soup = BeautifulSoup(f.read(), 'lxml')

	dt = soup.find_all('dt')
	folder_name =''
	for i in dt:
		n = i.find_next()
		if n.name == 'h3':
			folder_name = n.text
			continue
		else:
			url          = n.get("href")
			website_name = n.text
			icon         = n.get("icon")
			if icon != None:
				icon_name = Base64toPNG(icon, website_name)
			cat_id = AddFlameCategory(folder_name)
			AddFlameBookmark(website_name, url, cat_id, icon_name)




def AddFlameCategory(cat_name):
	"""
        Parses HTML bookmarks file

		Parameters:
			cat_name (str): category name

		Returns:
			cat_id (int): primary key id of cat_name

        """



	con       = sqlite3.connect(data_path + 'db.sqlite')
	cur       = con.cursor()
	count_sql = ("SELECT count(*) FROM categories WHERE name = ?;")
	cur.execute(count_sql, [cat_name])
	count = int(cur.fetchall()[0][0])
	if count > 0:
		getid_sql = ("SELECT id FROM categories WHERE name = ?;")
		cur.execute(getid_sql, [cat_name])
		cat_id = int(cur.fetchall()[0][0])
		return cat_id

	is_pinned = 1

	insert_sql = "INSERT OR IGNORE INTO categories(name, isPinned, createdAt, updatedAt) VALUES (?, ?, ?, ?);"
	cur.execute(insert_sql, (cat_name, is_pinned, created, updated))
	con.commit()

	getid_sql = ("SELECT id FROM categories WHERE name = ?;")
	cur.execute(getid_sql, [cat_name])
	cat_id = int(cur.fetchall()[0][0])
	return cat_id




def AddFlameBookmark(website_name, url, cat_id, icon_name):
	con = sqlite3.connect(data_path + 'db.sqlite')
	cur = con.cursor()
	if icon_name == None:
		insert_sql = "INSERT OR IGNORE INTO bookmarks(name, url, categoryId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?);"
		cur.execute(insert_sql, (website_name, url, cat_id, created, updated))
		con.commit()
	else:
		insert_sql = "INSERT OR IGNORE INTO bookmarks(name, url, categoryId, icon, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);"
		cur.execute(insert_sql, (website_name, url, cat_id, icon_name, created, updated))
		con.commit()








if __name__ == "__main__":
	FlameBookmarkParser(bookmarks_path)