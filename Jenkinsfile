pipeline {
    agent any

    environment {
        IMAGE_NAME = "abakhar217/front-investbuddy:Front-InvestBuddy-${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                          branches: [[name: 'main']],
                          userRemoteConfigs: [[url: 'https://github.com/InvestBuddy/Frontend.git', credentialsId: 'Git']]])
            }
        }
       stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                   bat 'npm install'
                   bat "sonar-scanner -Dsonar.login=%SONAR_TOKEN%"
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
                   bat "echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% %DOCKER_PASSWORD%"
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
