pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh './gradlew assemble'
      }
    }
    stage('build docker') {
      steps {
        sh 'docker build -t gcr.io/circular-ether-206902/demo:v14 .'
      }
    }
    stage('push image to gcp') {

    agent {
         docker {
                  image 'google/cloud-sdk'
                  args '-u 0:0 -v $HOME/.config -e HTTPS_PROXY=thd-svr-proxy-qa.homedepot.com:9090'
                }
    }
      steps {
              withCredentials([file(credentialsId: "ci-cd", variable: 'deployKey')]) {
                    sh "gcloud config set proxy/type http"
                    sh "gcloud config set proxy/address thd-svr-proxy-qa.homedepot.com"
                    sh "gcloud config set proxy/port 7070"
                    
                    //GCP Props.
                    sh "gcloud config set project circular-ether-206902"
                    sh "gcloud config set compute/zone us-central1-a"
                    sh "gcloud config set container/use_v1_api_client false"
                    
                    // Authenticate
                    sh "gcloud auth activate-service-account --key-file ${deployKey}"
                    sh "gcloud container clusters get-credentials learningapp-cluster --zone us-central1-a --project circular-ether-206902"
                    sh 'gcloud docker -- push gcr.io/circular-ether-206902/demo:v14'
                    sh 'kubectl apply -f ./deployment.yml'
              }

      }
    }
  }
}
