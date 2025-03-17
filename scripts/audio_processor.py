# audio_processor.py
from vosk import Model, KaldiRecognizer
import sys
import json
import ffmpeg
import wave
import os
import time

def process_video(video_path, max_duration=15):
    start_time = time.time()
    temp_audio = os.path.join(os.path.dirname(__file__), "temp.wav")

    try:
        # Switch to the smaller model
        model_path = "C:/Users/asada/Downloads/vosk-model-ar-0.22-linto-1.1.0"
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Vosk model directory not found at: {model_path}")

        print("Loading Vosk model...", file=sys.stderr)
        model_start = time.time()
        model = Model(model_path)
        print(f"Model loaded in {time.time() - model_start:.2f} seconds", file=sys.stderr)

        if not os.path.exists(video_path):
            raise FileNotFoundError(f"Video file not found at: {video_path}")

        print("Extracting audio...", file=sys.stderr)
        audio_start = time.time()
        try:
            stream = ffmpeg.input(video_path, t=max_duration)
            stream = ffmpeg.output(stream, temp_audio, 
                                 acodec='pcm_s16le', 
                                 ac=1, 
                                 ar=16000,
                                 loglevel="quiet")
            ffmpeg.run(stream, overwrite_output=True)
            print(f"Audio extracted in {time.time() - audio_start:.2f} seconds", file=sys.stderr)
        except ffmpeg.Error as e:
            raise Exception(f"FFmpeg error: {str(e)}")

        print("Starting transcription...", file=sys.stderr)
        transcribe_start = time.time()
        with wave.open(temp_audio, 'rb') as wf:
            print(f"Audio format - Channels: {wf.getnchannels()}, Sample width: {wf.getsampwidth()}, Frame rate: {wf.getframerate()}", file=sys.stderr)
            if wf.getnchannels() != 1 or wf.getsampwidth() != 2 or wf.getframerate() != 16000:
                raise Exception("Audio format not compatible")

            # Adjust beam and max-active for better balance of speed and accuracy
            rec = KaldiRecognizer(model, wf.getframerate(), '{"beam": 13, "max-active": 7000, "lattice-beam": 6}')
            text = ""
            previous_partial = ""  # To filter repetitions

            while True:
                data = wf.readframes(8000)
                if len(data) == 0:
                    break
                if rec.AcceptWaveform(data):
                    result = json.loads(rec.Result())
                    new_text = result.get('text', '')
                    if new_text and new_text != previous_partial:  # Avoid repeating the same phrase
                        text += new_text + " "
                        print(f"Recognized: {new_text}", file=sys.stderr)
                    previous_partial = new_text
                else:
                    partial = json.loads(rec.PartialResult())
                    partial_text = partial.get('partial', '')
                    if partial_text and partial_text != previous_partial:
                        text += partial_text + " "
                        print(f"Partial: {partial_text}", file=sys.stderr)
                    previous_partial = partial_text

        # Keep temp.wav for debugging (comment out to delete)
        if os.path.exists(temp_audio):
            os.remove(temp_audio)

        transcription = text.strip()
        print(f"Transcription completed in {time.time() - transcribe_start:.2f} seconds", file=sys.stderr)
        print(f"Total time: {time.time() - start_time:.2f} seconds", file=sys.stderr)

        if not transcription:
            return "No transcription detected"
        return transcription

    except Exception as e:
        if os.path.exists(temp_audio):
            os.remove(temp_audio)
        return f"Error: {str(e)}"

def post_process(text):
    corrections = {
        "allah": "ٱللَّه",
        "al": "ٱلْ",
        "bism": "بِسْمِ",
        "rahman": "ٱلرَّحْمَٰنِ",
        "rahim": "ٱلرَّحِيمِ",
        "waduha": "وَٱلضُّحَىٰ",  # For Surah Ad-Duha
        "wallayl": "وَٱللَّيْلِ"   # For Surah Ad-Duha
    }

    words = text.split()
    processed_words = []

    for word in words:
        if word.lower() in corrections:
            processed_words.append(corrections[word.lower()])
        else:
            vocalized = add_basic_diacritics(word)
            processed_words.append(vocalized)

    result = " ".join(processed_words)
    return result.strip()

def add_basic_diacritics(word):
    FATHA = '\u064E'   # Zabar (َ)
    KASRA = '\u0650'   # Zer (ِ)
    DAMMA = '\u064F'   # Pesh (ُ)
    SUKUN = '\u0652'   # Sukun (ْ)
    SHADDA = '\u0651'  # Shadda (ّ)

    vocalized = ""
    for i, char in enumerate(word):
        vocalized += char
        if char in "بتثجحخدذرزسشصضطظعغفقكلمنهوية":
            if i < len(word) - 1:
                vocalized += FATHA
            else:
                vocalized += SUKUN
    
    return vocalized

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No video file provided"}), file=sys.stdout)
        sys.exit(1)

    video_path = sys.argv[1]
    result = process_video(video_path)
    final_result = post_process(result)
    print(json.dumps({"text": final_result}), file=sys.stdout)