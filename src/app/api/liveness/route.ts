import { NextResponse } from 'next/server';

/**
 * Liveness Probe Endpoint
 *
 * This endpoint checks if the application is running and responsive.
 * Kubernetes uses this to determine if the container should be restarted.
 *
 * Should return:
 * - 200 OK: Application is alive and running
 * - 5xx: Application is dead and should be restarted
 */
export async function GET() {
  try {
    // Basic health check - if we can respond, we're alive
    const timestamp = new Date().toISOString();

    // You can add more sophisticated checks here if needed:
    // - Check if critical services are accessible
    // - Verify essential dependencies are working

    return NextResponse.json(
      {
        status: 'ok',
        timestamp,
        service: 'gen-ai',
        alive: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Liveness probe failed:', error);

    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        service: 'gen-ai',
        alive: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
