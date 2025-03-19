pipeline {
    agent any

    environment {
        IMAGE_NAME = "gyuho0897/frontend"
        IMAGE_TAG = "${BUILD_NUMBER}"
        WORKSPACE_DIR = "/var/lib/jenkins/workspace/nginx"
    }

    stages {
        stage('Git Clone') {
            steps {
                echo 'Cloning repository'
                git branch: 'main', url: 'https://github.com/beyond-sw-camp/be12-2nd-Matfia-Eatzzy.git'
            }
        }

        stage('Node.js Build') {
            steps {
                dir('nginx') { // Git Clone한 프로젝트 디렉토리로 이동
                    echo "Removing old dependencies"
                    sh 'rm -rf node_modules package-lock.json'

                    echo "Installing Node.js dependencies"
                    sh 'npm install --force'

                    echo "Building the project"
                    sh 'npm run build'

                    // dist 폴더가 생성되었는지 확인
                    script {
                        def distExists = sh(script: 'test -d dist && echo "true" || echo "false"', returnStdout: true).trim()
                        if (distExists != 'true') {
                            error("Error: dist directory not found!")
                        }
                    }
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    dir('nginx') { // Dockerfile이 있는 디렉토리에서 실행
                        echo "Building Docker Image: ${IMAGE_NAME}:${IMAGE_TAG}"
                        def dockerImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}", "--no-cache .")

                        echo "Pushing Docker Image to DockerHub"
                        withDockerRegistry([credentialsId: 'DOCKER_HUB']) {
                            dockerImage.push()
                        }
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'k8s',
                                verbose: true,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'k8s/frontend-deployment.yml',
                                        remoteDirectory: '/',
                                        execCommand: '''
                                            sed -i "s/latest/${BUILD_NUMBER}/g" k8s/frontend-deployment.yml
                                            kubectl apply -f /home/test/k8s/frontend-deployment.yml
                                        '''
                                    ),
                                    sshTransfer(
                                    execCommand: '''
                                    kubectl apply -f /home/test/k8s/frontend-deployment.yml
                                    '''
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
}
