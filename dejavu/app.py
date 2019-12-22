from dejavu import Dejavu
from dejavu.recognize import FileRecognizer, MicrophoneRecognizer
from flask import Flask, request, Response, jsonify
from pathlib import Path
import os
app = Flask(__name__)
config = {
	"database": {
		"host": "db",
		"user": "root",
		"passwd": "", 
		"db": "dejavu",
	}
}

path2="/dejavu/temp/fingerprint"
path="/dejavu/temp/recognize"
@app.route("/recognize", methods=["POST"])
def recognize_audio():
  	# load config
  	# check if the post request has the audio part
	if "audio" not in request.files:
		data={'message':'Audio to fingerprint is missing.'}
		return jsonify(data),400
	else:
		print ("bat dau xu ly file upload")
		audio = request.files["audio"]
		#filename = request.form["info"]
		if audio.filename == "":
			data={'message':'Audio to fingerprint is missing.'}
			return jsonify(data),400
		else:
		# Save file in a temporary location
			try:
				name, ext = os.path.splitext(audio.filename)
				print ("Save file...")
				if ext not in ('.mp3'):
					return {'message':'File extension not allowed.'}
				audio.save(os.path.join(path, name+ext))
			except Exception as ex:
				template = "An 1 exception of type {0} occurred. Arguments:\n{1!r}"
				message = template.format(type(ex).__name__, ex.args)
				data={'message':message}
				return data

	      # Create a Dejavu instance
			print ("Create instance")
	      		djv = Dejavu(config)

	      # Recognize audio from a file
			try:
				print ("recognize audio is starting")
				song = djv.recognize(FileRecognizer, os.path.join(path, name+ext))
				print (song)
				data = {'message':'successful', 'result':song}
				os.remove(os.path.join(path, name+ext))
				if song:
				  	return jsonify(data)
				else:
					return {'message':'None'}
				
			except Exception as ex:
				template = "An 2 exception of type {0} occurred. Arguments:\n{1!r}"
				message = template.format(type(ex).__name__, ex.args)
				data={'message':message}
				return data
	return Response(status = 200)
@app.route("/fingerprint", methods=["POST"])
def fingerprint_audio():
  	# check if the post request has the audio part
	if ('audio') not in request.files:
		data={'message':'Audio to fingerprint is missing.'}
		return jsonify(data),400
	elif ('info') not in request.form:
		data={'message':'Info of file is missing'}
		return jsonify(data),400
	else:
		print ("bat dau xu ly file upload")
		audio = request.files["audio"]
		filename = request.form["info"]
		if audio.filename == "":
			data={'message':'Audio to fingerprint is missing.'}
			return jsonify(data),400
		else:
		# Save file in a temporary location
			try:
				name, ext = os.path.splitext(audio.filename)
				print ("Save file...")
				if ext not in ('.mp3'):
					return {'message':'File extension not allowed.'}
				audio.save(os.path.join(path2, str(filename) + ext))
			except Exception as ex:
				template = "An 1 exception of type {0} occurred. Arguments:\n{1!r}"
				message = template.format(type(ex).__name__, ex.args)
				data={'message':message}
				return data

	      # Create a Dejavu instance
			print ("Create instance")
	      		djv = Dejavu(config)

	      # Fingerprinting audio from a file
			try:
				print ("recognize audio is starting")
				song = djv.fingerprint_file(os.path.join(path2, str(filename)+ext))
				data={'message':'completed'}
				print (song)
				os.remove(os.path.join(path2, str(filename) + ext))
				return jsonify(data)
			except Exception as ex:
				template = "An 2 exception of type {0} occurred. Arguments:\n{1!r}"
				message = template.format(type(ex).__name__, ex.args)
				data={'message':message}
				return data
	return Response(status = 200)
if __name__ == '__main__':
	app.run(host= '0.0.0.0')
