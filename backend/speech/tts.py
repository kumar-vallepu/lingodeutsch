import asyncio
import edge_tts
import uuid
import os

from playsound import playsound

from LingoDeutsch.lingodeutsch.backend.config import VOICE

async def speak(text):

    filename = f"voice_{uuid.uuid4().hex}.mp3"

    communicate = edge_tts.Communicate(
        text=text,
        voice=VOICE
    )

    await communicate.save(filename)

    try:
        playsound(filename)

    finally:
        if os.path.exists(filename):
            os.remove(filename)

def speak_sync(text):
    asyncio.run(speak(text))