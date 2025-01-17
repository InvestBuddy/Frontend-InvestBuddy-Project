pipeline {
    agent any

    environment {
        IMAGE_NAME = "abakhar217/front-investbuddy:Front-InvestBuddy-${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository using the configured Git credentials
                checkout([$class: 'GitSCM',
                          branches: [[name: 'main']],
                          userRemoteConfigs: [[url: 'https://github.com/InvestBuddy/Frontend.git', credentialsId: 'git']]])
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                   bat 'npm install'
                   bat " npm sonar"
                }
            }
        }

         stage('Build Frontend Image') {
           steps {
             echo 'Building Docker image for frontend...'
             bat "docker build -t ${IMAGE_NAME} ."
           }
        }
        
        stage('Push Frontend Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DockerHub', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                   // The docker login command was not correct, this is the correct way to pass the password
                   bat "docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%"
                    bat "docker push ${IMAGE_NAME}"
                }
            }
        }

       // stage('Deploy Frontend Stack') {
        //   steps {
        //         withKubeConfig([credentialsId: 'kubectl']) {
        //           bat """
        //                kubectl apply -f frontend.yml
        //             """
        //         }
        //     }
        // }
    }
}
