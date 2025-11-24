describe('Auditoría de Performance - SauceDemo', () => {

    it('Debe cumplir con métricas de Lighthouse en la página de Login', () => {
      // Visitar la página de login
      cy.visit('/')

      // Ejecutar auditoría de Lighthouse con umbrales moderados
      cy.lighthouse({
        performance: 70,
        accessibility: 80,
        'best-practices': 80,
        seo: 70
      })
    })

    it('Debe cumplir con Core Web Vitals específicos', () => {
      cy.visit('/')

        const thresholds = {
            performance: 90,
            'first-contentful-paint': 1800,     // < 1.8 segundos
            'largest-contentful-paint': 2500,   // < 2.5 segundos
            'cumulative-layout-shift': 0.1,     // < 0.1
            'total-blocking-time': 200,
        }

        const desktopConfig = {
            formFactor: "desktop",
            screenEmulation: {
                width: 1350,
                height: 940,
                deviceScaleRatio: 1,
                mobile: false,
                disable: false,
            },
            throttling: {
                rttMs: 40,
                throughputKbps: 11024,
                cpuSlowdownMultiplier: 1,
                requestLatencyMs: 0,
                downloadThroughputKbps: 0,
                uploadThroughputKbps: 0,
            },
        };

       const mobileConfig = {
        formFactor: "mobile",
        screenEmulation: {
            width: 375,      // típico iPhone
            height: 667,
            deviceScaleRatio: 2,
            mobile: true,
            disable: false,
        },
        throttling: {
            rttMs: 150,              // 150ms (Regular 3G/4G)
            throughputKbps: 1600,    // ~1.6Mbps
            cpuSlowdownMultiplier: 4, // Lighthouse recommendation for mobile
            requestLatencyMs: 0,
            downloadThroughputKbps: 0,
            uploadThroughputKbps: 0,
        },
        };

        const lighthouseConfig = {
            output: "json",
        };

      // Auditoría con métricas específicas en milisegundos
      cy.lighthouse(thresholds, desktopConfig, lighthouseConfig)
      //cy.lighthouse(thresholds, mobileConfig, lighthouseConfig)
             
   })

})