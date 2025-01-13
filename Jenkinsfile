pipeline {
    agent any
    triggers {
        pollSCM('H/5 * * * *')
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('yassineboudriga')
        IMAGE_NAME_SERVER = 'yassineboudriga/mern-server' // Remplacez par votre vrai nom d'utilisateur
        IMAGE_NAME_CLIENT = 'yassineboudriga/mern-client' // Remplacez par votre vrai nom d'utilisateur
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/BOUDRIGAYassine/MERN-Pipeline.git',
                    credentialsId: 'Gitlab_ssh'
            }
        }
        stage('Build Server Image') {
            steps {
                dir('server') {
                    script {
                        dockerImageServer = docker . build ("${IMAGE_NAME_SERVER}")
                    }
                }
            }
        }   


        stage('Build Client Image') {
            steps {
                dir('client') {
                    script {
                        dockerImageClient = docker.build("${IMAGE_NAME_CLIENT}")
                    }
                }
            }
        }
        stage('Scan Server Image') {
            steps {
                script {
                    sh """
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                        aquasec/trivy:latest image --exit-code 0 \
                        --severity LOW,MEDIUM,HIGH,CRITICAL \
                        ${IMAGE_NAME_SERVER}
                    """
                }
            }
        }
        stage('Scan Client Image') {
            steps {
                script {
                    sh """
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                        aquasec/trivy:latest image --exit-code 0 \
                        --severity LOW,MEDIUM,HIGH,CRITICAL \
                        ${IMAGE_NAME_CLIENT}
                    """
                }
            }
        }
        stage('Push Images to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', "${DOCKERHUB_CREDENTIALS}") {
                        dockerImageServer.push()
                        dockerImageClient.push()
                    }
                }
            }
        }
    }
}
