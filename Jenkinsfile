node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
      sh 'printenv'
    }
    stage('Build Docker test'){
     sh 'docker build -t node_server_test -f Dockerfile.test --no-cache .'
    }
    stage('Docker test'){
      sh 'docker run --rm node_server_test'
    }
    stage('Clean Docker test'){
      sh 'docker rmi node_server_test'
    }
    stage('Deploy'){
      if(env.BRANCH_NAME == 'master'){
        sh 'docker build -t node_server_prod --no-cache .'
        sh 'docker tag node_server_prod localhost:5000/node_server_prod'
        sh 'docker push localhost:5000/node_server_prod'
        sh 'docker rmi -f node_server_prod localhost:5000/node_server_prod'
      }
    }
  }
  catch (err) {
    throw err
  }
}