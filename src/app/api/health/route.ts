import { NextResponse } from 'next/server';

/**
 * General Health Check Endpoint
 *
 * This is a comprehensive health check endpoint that combines
 * liveness and readiness information for manual testing and monitoring.
 */
export async function GET() {
  try {
    const timestamp = new Date().toISOString();
    const uptime = process.uptime();

    // System information
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      uptime: `${Math.floor(uptime / 60)}m ${Math.floor(uptime % 60)}s`,
      memoryUsage: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development',
    };

    return NextResponse.json(
      {
        status: 'healthy',
        timestamp,
        service: 'gen-ai',
        version: '1.0.0', // Update with your app version
        environment: process.env.NODE_ENV || 'development',
        uptime: systemInfo.uptime,
        system: systemInfo,
        endpoints: {
          liveness: '/api/liveness',
          readiness: '/api/readiness',
          health: '/api/health',
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      },
    );
  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        service: 'gen-ai',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
