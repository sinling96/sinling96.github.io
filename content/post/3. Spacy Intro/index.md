---
title: "Text Classification using spaCy (Intro)"
date: 2020-06-26
slug: "spacy(intro)"
image: "girl-writing-classroom-quote.jpg"
categories:
    - Tutorial
tags:
  - NLP
  - Spacy
---


Despite the rapid development of AI technology, there are still a huge amount of text data remained undiscovered. Unstructured data contains a lot of data that would be useful if we know how to transform unstructured data to structured data.

In today's tutorial, we are going to explore how we can classified text data to specific categories which could be useful for the analysis, by using Python package [spaCy](https://spacy.io/).

# What is spaCy?
spaCy is an open source Natural Language Processing library for Python. It is designed for industrial-scale NLP usage, which performs NLP processes efficiently. 

In this tutorial, we will focus more on rule-based matching, where we will detect and classify documents based on the rules. These rules works pretty much similar to regex, but with additional functionalities such as relationships between token which are pretty handfull in some use case.

If you would like to understand more about rule based matching, feel free to jump into the [documentation](https://spacy.io/usage/rule-based-matching).

On a side note, spaCy do provide online courses: [Advanced NLP with spaCy](https://course.spacy.io/) if you are interested to learn. You will be learning how to use spaCy to build advanced natural language understanding systems, using both rule-based and machine learning approaches.

## spaCy + Model Installation
Before we begin, let's install spacy and english language model.<br/>
FYI, spaCy supports 15 language models: including English, Chinese, Portugese, French, etc. To understand more on the models, please visit spaCy [documentation](https://spacy.io/usage/models).



``` 
pip install spacy
py -m spacy download en_core_web_sm
```

# Load Library


```python
import spacy
nlp = spacy.load("en_core_web_sm")
```

# Get Started
Now that you have your spaCy installed, we will begin to detect the text based on some rules. This is known as Rule-Based Matching in spaCy. These rules works pretty much similar to regex, but with additional functionalities such as relationships between token which are pretty handfull in some use case.

If you would like to understand more about rule based matching, feel free to jump into the [documentation](https://spacy.io/usage/rule-based-matching).

# Objective
The objective of this tutorial is to **detect the sentiment of the review** using rule-based matching in spaCy. Well, spaCy rule matching is definitely not be the best way to detect sentiment in the text, but we are just using it as a use case to demo how we can use spaCy for text classification. 
<br></br><br></br>
One of the application of this would be classifying **Work from Home Difficulties** into categories such as:
- Network Issues
- Communication Issues
- Lack of Tool
- Personal Preference

## 1. Import Data
Firstly, we will need to import our text data. <br></br>
For the tutorial today, we are going to use [imdb movie review dataset](https://www.kaggle.com/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews) for demonstration, which I downlaoded from Kaggle.



```python
import pandas as pd
df = pd.read_csv(r"C:\Users\sinlingchan\Desktop\Workspace\NLP Documentation\resources\IMDB Dataset.csv")
df.head() # always check the data when you import in
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>review</th>
      <th>sentiment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>One of the other reviewers has mentioned that ...</td>
      <td>positive</td>
    </tr>
    <tr>
      <th>1</th>
      <td>A wonderful little production. &lt;br /&gt;&lt;br /&gt;The...</td>
      <td>positive</td>
    </tr>
    <tr>
      <th>2</th>
      <td>I thought this was a wonderful way to spend ti...</td>
      <td>positive</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Basically there's a family where a little boy ...</td>
      <td>negative</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Petter Mattei's "Love in the Time of Money" is...</td>
      <td>positive</td>
    </tr>
  </tbody>
</table>
</div>



Check the number of observations


```python
print("Number of rows:", df.shape[0])
```

    Number of rows: 50000
    

As there are 50k records in this dataset, which will be time consuming to run during development. I would suggest to subset the data to may be 1k first.



```python
df=df[:1000]
```

Before we proceed further, it is important that we understand some of the common key terms in NLP.
### Familiarize with NLP Terms
<img src="text_hierarchy.png"></img>
In NLP context,
<br></br>**Token** refers to a single word.
<br></br> **Document** refers to a combinations of tokens.
<br></br>**Corpus** refers to a combination of documents.


```python
# this is a document
df['review'][2] 
```




    'I thought this was a wonderful way to spend time on a too hot summer weekend, sitting in the air conditioned theater and watching a light-hearted comedy. The plot is simplistic, but the dialogue is witty and the characters are likable (even the well bread suspected serial killer). While some may be disappointed when they realize this is not Match Point 2: Risk Addiction, I thought it was proof that Woody Allen is still fully in control of the style many of us have grown to love.<br /><br />This was the most I\'d laughed at one of Woody\'s comedies in years (dare I say a decade?). While I\'ve never been impressed with Scarlet Johanson, in this she managed to tone down her "sexy" image and jumped right into a average, but spirited young woman.<br /><br />This may not be the crown jewel of his career, but it was wittier than "Devil Wears Prada" and more interesting than "Superman" a great comedy to go see with friends.'




```python
# this is a token
token_list = [token.text for token in doc]
print("This is the first token:",token_list[0])
```

    This is the first token: I
    

## 2. Initialise matcher engine <br/>
Next, we would need to initialise the rule-matching engine - "Matcher" before we could use them.


```python
from spacy.matcher import Matcher
matcher = Matcher(nlp.vocab, validate=True)
```

## 3. Add rules to matcher engine
Remember our objective is to detect text sentiment, so now let say I know the word "wonder" usually infers positive sentiment. We can now define a rule to add to Matcher.


```python
rule = [{'LOWER':'wonder'}] #define rule
matcher.add("Positive",None,rule) #add rule to matcher
```

## 4. Process Text


```python
doc = nlp(df['review'][2]) #process text
```


```python
matches = matcher(doc)
print(matches)
```

    [(12522029899379299251, 5, 6)]
    

The matcher returns a list of (match_id, start, end) tuples. In our case, [('12522029899379299251', 5, 6)], which maps to the span doc[5:6] of our original document.


```python
for match_id, start, end in matches:
    string_id = nlp.vocab.strings[match_id]  # Get string representation
    span = doc[start:end]  # The matched span
    print(match_id, string_id, start, end, span.text)
```

    12522029899379299251 Positive 5 6 wonderful
    

If we loop through the tuples, we can find the token that matched the rule -- *wonderful*

### Process all the reviews
Now we can find all the document that matched the rule.


```python
all_text = df['review'].tolist()

# print(all_text)
detectable = [d.text for d in nlp.pipe(all_text) if len(matcher(d))>0]

non_detectable = [d.text for d in nlp.pipe(all_text) if len(matcher(d))==0]

print("Total: ", len(all_text), "\n","Detected: ",len(detectable), "\n","Undetected: ", len(non_detectable))
```

    Total:  1000 
     Detected:  86 
     Undetected:  914
    



## 5. Text Classification
 From the result, 86 documents matched the rule. We can now categorise these text as "Positive".


```python
positive = []
for i in range(len(df)):
    if df['review'].iloc[i] in detectable:
        positive.append("Positive")
    else: 
        positive.append("")
```


```python
output = pd.DataFrame({"review":all_text,"sentiment":positive}) #transform to dataframe
```


```python
output.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>review</th>
      <th>sentiment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>One of the other reviewers has mentioned that ...</td>
      <td></td>
    </tr>
    <tr>
      <th>1</th>
      <td>A wonderful little production. &lt;br /&gt;&lt;br /&gt;The...</td>
      <td>Positive</td>
    </tr>
    <tr>
      <th>2</th>
      <td>I thought this was a wonderful way to spend ti...</td>
      <td>Positive</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Basically there's a family where a little boy ...</td>
      <td></td>
    </tr>
    <tr>
      <th>4</th>
      <td>Petter Mattei's "Love in the Time of Money" is...</td>
      <td></td>
    </tr>
  </tbody>
</table>
</div>




```python
output[output['sentiment']=="Positive"]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>review</th>
      <th>sentiment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>A wonderful little production. &lt;br /&gt;&lt;br /&gt;The...</td>
      <td>Positive</td>
    </tr>
    <tr>
      <th>2</th>
      <td>I thought this was a wonderful way to spend ti...</td>
      <td>Positive</td>
    </tr>
    <tr>
      <th>29</th>
      <td>'War movie' is a Hollywood genre that has been...</td>
      <td>Positive</td>
    </tr>
    <tr>
      <th>35</th>
      <td>I bought this film at Blockbuster for $3.00, b...</td>
      <td>Positive</td>
    </tr>
    <tr>
      <th>39</th>
      <td>After sitting through this pile of dung, my hu...</td>
      <td>Positive</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>925</th>
      <td>Do a title search on Randolph Scott and TRAIL ...</td>
      <td>Positive</td>
    </tr>
    <tr>
      <th>941</th>
      <td>The movie itself made me want to go and call s...</td>
      <td>Positive</td>
    </tr>
    <tr>
      <th>943</th>
      <td>A film for mature, educated audiences...&lt;br /&gt;...</td>
      <td>Positive</td>
    </tr>
    <tr>
      <th>955</th>
      <td>Previous reviewer Claudio Carvalho gave a much...</td>
      <td>Positive</td>
    </tr>
    <tr>
      <th>994</th>
      <td>On watching this film, I was amazed at how med...</td>
      <td>Positive</td>
    </tr>
  </tbody>
</table>
<p>86 rows × 2 columns</p>
</div>



### Tedious?

**Congratulations!** Now we are able to use spaCy's rule-matching feature to detect pattern in the text for text classification. However, I find that defining rules and adding it into matching engine is quite tedious. Imagine if we have more than 20 or 100 rules, how many line of codes we are going to repeat in this step? <br></br>
To solve this issue, I have come up with a solution to make this process more efficient. I'll write up an article on this topic soon. Stay tune! :D


Cover Photo by <a href="https://unsplash.com/@leookubo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Leonardo Toshiro Okubo</a> on <a href="https://unsplash.com/s/photos/language?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  