function createDeploymentBody(appName, image) {
 return {
   kind: 'Deployment',
   metadata: {
     name: `${appName}-deploy`,
     labels: {
       app: appName,
     }
   },
   spec: {
     replicas: 1,
     selector: {
       matchLabels: {
         app: appName
       }
     },
     template: {
       metadata: {
         labels: {
           app: appName
         }
       },
       spec: {
         containers: [{
           name: `${appName}-container`,
           imagePullPolicy: 'Always',
           image,
           ports: [
             {
               containerPort: 8080,
               protocol: 'TCP'
             }
           ],
           resources: {
             requests: {
               cpu: '50m',
               memory: '64Mi'
             }
           }
         }]
       }
     }
   }
 };
}

function createServiceBody(appName) {
  return {
    kind: 'Service',
    metadata: {
      labels: {
        app: appName
      },
      name: `${appName}-svc`,
    },
    spec: {
      ports: [
        {
          port: 80,
          protocol: 'TCP',
          targetPort: 8080
        }
      ],
      selector: {
        app: appName
      },
      sessionAffinity: 'None',
      type: 'ClusterIP'
    }
  }
}

function createIngressBody(appName) {
  return {
    kind: 'Ingress',
    metadata: {
      annotations: {
        'ingress.kubernetes.io/rewrite-target': '/',
        'kubernetes.io/ingress.class': 'nginx'
      },
      labels: {
        app: appName
      },
      name: `${appName}-ing`,
    },
    spec: {
      rules: [
        {
          http: {
            paths: [
              {
                backend: {
                  serviceName: `${appName}-svc`,
                  servicePort: 80
                },
                path: `/${appName}`
              }
            ]
          }
        }
      ]
    },
  }
}

module.exports = {
  createDeploymentBody,
  createServiceBody,
  createIngressBody,
};
