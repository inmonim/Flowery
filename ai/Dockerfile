# base image
FROM python:3.11.2

# set the working directory in the container
WORKDIR /ai

# copy the Flask app code to the container
COPY . /ai

RUN apt update && apt-get install python3 python3-pip -y

# install necessary packages
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# set environment variables
ENV FLASK_APP=flowery
ENV FLASK_RUN_PORT=5000

# expose the port that Flask will run on
EXPOSE 5000

# run the Flask app
CMD [ "flask", "run", "--host=0.0.0.0", "--port=5000" ]