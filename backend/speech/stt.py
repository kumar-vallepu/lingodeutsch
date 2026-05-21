import speech_recognition as sr

recognizer = sr.Recognizer()
mic = sr.Microphone()

def listen(prompt="Listening..."):

    with mic as source:

        print(f"\n🎤 {prompt}")

        recognizer.adjust_for_ambient_noise(
            source,
            duration=1
        )

        try:

            audio = recognizer.listen(
                source,
                timeout=5,
                phrase_time_limit=8
            )

        except sr.WaitTimeoutError:

            print("⌛ Listening timeout")

            return ""

    # =========================
    # TRY GERMAN FIRST
    # =========================
    try:

        text = recognizer.recognize_google(
            audio,
            language="de-DE"
        ).lower()

        print(f"🗣️ You (DE): {text}")

        return text

    # =========================
    # FALLBACK TO ENGLISH
    # =========================
    except sr.UnknownValueError:

        try:

            text = recognizer.recognize_google(
                audio,
                language="en-US"
            ).lower()

            print(f"🗣️ You (EN): {text}")

            return text

        except sr.UnknownValueError:

            print("❌ Could not understand audio")

            return ""

    # =========================
    # NETWORK/API ERRORS
    # =========================
    except sr.RequestError as e:

        print(f"🚨 Speech Recognition Error: {e}")

        return ""

    except Exception as e:

        print(f"🚨 Unexpected Error: {e}")

        return ""