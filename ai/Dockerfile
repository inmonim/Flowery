# base image
FROM python:3.11.2

# set the working directory in the container
WORKDIR /ai

# copy the Flask app code to the container
COPY . /ai

# install necessary packages
RUN pip3 install flask
RUN pip3 install flask_cors
RUN pip3 install flask_sqlalchemy
RUN pip3 install pymysql
RUN pip3 install opencv_python
RUN pip3 install pandas
RUN pip3 install pyyaml
RUN pip3 install tqdm
RUN pip3 install matplotlib
RUN pip3 install seaborn
RUN pip3 install torch torchvision torchaudio

# set environment variables
ENV FLASK_APP=flowery
ENV FLASK_RUN_PORT=5000

# expose the port that Flask will run on
EXPOSE 5000

# run the Flask app
#CMD [ "flask", "run", "--host=0.0.0.0", "--port=5000" ]