from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(
    api_key="AQ.Ab8RN6Ib0iC0SirdyahRTmUuPy3tGdL3n5NVEQlROp0x-cQA0A",
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)


class ChatRequest(BaseModel):
    message: str
    mode:str


chat_memory = []

SYSTEM_PROMPT = """
You are MindBot, a friendly, intelligent, and helpful AI assistant created and developed by Sujit Kar.
When asked who created you, state that you were created by Sujit Kar.
"""

def generate_response(prompt:str,mode:str):
    global chat_memory

    if(mode=="without-memory"):
        messages=[{"role":"system","content":SYSTEM_PROMPT},
            {"role":"user","content":prompt}
        ]
        response =client.chat.completions.create(
            model="gemini-3.1-flash-lite",
            messages=messages
        )

        return response.choices[0].message.content.strip()
    else:
        chat_memory.append({"role":"user","content":prompt})
        messages=[{"role":"system","content":SYSTEM_PROMPT}]+chat_memory

        response=client.chat.completions.create(
            model="gemini-3.1-flash-lite",
            messages=messages
        )
        bot_response =response.choices[0].message.content.strip()
        chat_memory.append({"role":"assistant","content":bot_response})
        return bot_response
            

@app.post("/chat")
async def chat(request: ChatRequest):
    response = generate_response(request.message, request.mode)
    return {"message": response}

@app.post("/reset")
async def reset_memory():
    global chat_memory
    chat_memory.clear()
    return {"status": "cleared"}

