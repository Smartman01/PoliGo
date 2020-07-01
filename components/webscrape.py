import requests
from bs4 import BeautifulSoup
import json
import re
regex = r'(?<!: )"(\S*?)"'

res = requests.get('https://www.270towin.com/2020-polls-biden-trump/national/')
soup_data = BeautifulSoup(res.text, 'html.parser')

data = soup_data.find('tr', {'id': 'poll_avg_row'}).findAll('td')

biden = float(data[1].get_text().strip().replace('%', ''))
trump = float(data[2].get_text().strip().replace('%', ''))
other = float("{:.2f}".format(biden - trump))

x = {
    'biden' : biden,
    'trump' : trump,
    'other' : other
}

print('export default pollAvgData =')
print(re.sub(regex, '\\1', json.dumps(x, indent=3)))

# print(soup_data.find_all('tr', {"class" : 'state-row'}))

# class PollingData:
#     def __init__(self, state, website):
#         self.state = state
#         self.website = website

# list = []

# for data in soup_data.find_all('tr', {"class" : 'state-row'}):
#     state = data.find('td', {'class': 'state-name'})
#     href = data.find('a')
#     list.append(PollingData(state.get_text('p'), href.get('href')))

# for poll in range(0, len(list)):
#     print(json.dumps(list[poll].__dict__))
