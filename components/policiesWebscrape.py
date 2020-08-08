import requests
from bs4 import BeautifulSoup
import json
import re
regex = r'(?<!: )"(\S*?)"'

res = requests.get('https://ballotpedia.org/Joe_Biden_presidential_campaign,_2020#Policy_positions')
policies_links = BeautifulSoup(res.text, 'html.parser')

categories = policies_links.find('div', {'class': 'mobile-columns'}).findAll('b')

# for b in categories:
#     print(b.get_text())

links = policies_links.find('div', {'class': 'mobile-columns'}).findAll('ul')

for policies in links:
    for a in policies.findAll('a'):
        print('https://ballotpedia.org' + a.get('href') + ',\n')
