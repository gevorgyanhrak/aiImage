import { NextResponse } from 'next/server';

/**
 * Readiness Probe Endpoint
 *
 * This endpoint checks if the application is ready to serve traffic.
 * Kubernetes uses this to determine if the pod should receive requests.
 *
 * Should return:
 * - 200 OK: Application is ready to serve traffic
 * - 503 Service Unavailable: Application is not ready (but still alive)
 */
export async function GET() {
  try {
    const timestamp = new Date().toISOString();

    // Comprehensive readiness checks
    const checks = {
      server: true, // Basic server check
      // Add more checks as needed:
      // database: await checkDatabase(),
      // externalAPI: await checkExternalServices(),
      // cache: await checkCache(),
    };

    // Determine if all checks pass
    const allChecksPass = Object.values(checks).every(check => check === true);

    if (allChecksPass) {
      return NextResponse.json(
        {
          status: 'ready',
          timestamp,
          service: 'gen-ai',
          ready: true,
          checks,
        },
        { status: 200 },
      );
    } else {
      // Service is alive but not ready to serve traffic
      return NextResponse.json(
        {
          status: 'not-ready',
          timestamp,
          service: 'gen-ai',
          ready: false,
          checks,
        },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error('Readiness probe failed:', error);

    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        service: 'gen-ai',
        ready: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 },
    );
  }
}

// Helper functions for more comprehensive checks (uncomment and implement as needed)

/*
async function checkDatabase(): Promise<boolean> {
  try {
    // Add your database connection check here
    // Example: await db.query('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database check failed:', error);
    return false;
  }
}

async function checkExternalServices(): Promise<boolean> {
  try {
    // Check external APIs or services your app depends on
    // Example: await fetch('https://api.example.com/health');
    return true;
  } catch (error) {
    console.error('External service check failed:', error);
    return false;
  }
}

async function checkCache(): Promise<boolean> {
  try {
    // Check Redis or other cache services
    return true;
  } catch (error) {
    console.error('Cache check failed:', error);
    return false;
  }
}
*/
