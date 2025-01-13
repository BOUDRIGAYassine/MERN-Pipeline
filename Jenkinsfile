pipeline {
    agent any
    triggers {
        pollSCM('H/5 * * * *')
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('yassineboudriga')
        IMAGE_NAME_SERVER = 'yassineboudriga/mern-server'
        IMAGE_NAME_CLIENT = 'yassineboudriga/mern-client'
        IMAGE_TAG = env.BUILD_NUMBER ?: 'latest'
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
                        sh 'ls -al' // Debug file existence
                        dockerImageServer = docker.build("${IMAGE_NAME_SERVER}:${IMAGE_TAG}")
                    }
                }
            }
        }
        stage('Build Client Image') {
            steps {
                dir('client') {
                    script {
                        sh 'ls -al' // Debug file existence
                        dockerImageClient = docker.build("${IMAGE_NAME_CLIENT}:${IMAGE_TAG}")
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
                        ${IMAGE_NAME_SERVER}:${IMAGE_TAG}
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
                        ${IMAGE_NAME_CLIENT}:${IMAGE_TAG}
                    """
                }
            }
        }
        stage('Push Images to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', "${DOCKERHUB_CREDENTIALS}") {
                        dockerImageServer.push("${IMAGE_TAG}")
                        dockerImageClient.push("${IMAGE_TAG}")
                    }
                }
            }
        }
    }
}
