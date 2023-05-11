import openai

with open('./openai_api_key.txt', 'r') as f:
    api_key = f.readline()

org_id = 'org-Qet9aDzXT2R98RAzCWgbUKtR'

openai.organization = org_id
openai.api_key = api_key


def make_poem(keyword1, keyword2):
    
    k = keyword2[-1]
    
    josa = '을' if (ord(k)-44032)%28 else '를'

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role":"user", "content": f"{keyword1}, {keyword2}{josa} 주제로 공백 포함 40글자 이내 짧은 시"}
        ]
    )
    
    return completion.choices[0].message.content