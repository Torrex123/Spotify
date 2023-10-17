FROM node:20.5-alpine3.17

# Set the working directory to /app
WORKDIR /Spotify

ENV ENV_NODE="development"

COPY . .

RUN chmod +x run_commands.sh

# Install the app's dependencies
RUN npm install

# Install Python 3.11 and create a virtual environment
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

RUN python3 -m venv venv

RUN apk add postgresql-dev gcc python3-dev musl-dev

# Activate the virtual environment and install the requirements
RUN . venv/bin/activate && \
    python3 -m pip install -r requirements.txt

# Expose port 3000 for the app to listen on
EXPOSE 3000

# Start the app with npm run start
CMD ["npm", "run", "start:dev"]



