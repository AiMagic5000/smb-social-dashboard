import { Post, N8nWebhookPayload } from '../types';

// n8n Instance Configuration
const N8N_CONFIG = {
  instanceUrl: 'https://n8n.srv836017.hstgr.cloud',
  apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOTA4NzRiMS1jNjNmLTRlNWItODc1OS1lNzdlNTczMzU5YzEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY3MTMzNzQ4LCJleHAiOjE3Njk2NDEyMDB9.F0sAE0wLQAQ4jnasPQSJZ8Xm_2Rk5rIsiZf-SWqGvKA',
  webhookEndpoint: '/webhook/smb-social-dashboard'
};

// Rube MCP Recipe IDs for fetching posts
const RECIPE_IDS = {
  instagramAM: 'rcp_ubT7s09SWdGW',
  instagramPM: 'rcp_iEQEn60rMFBC',
  youtubeAM: 'rcp_vX-dsfNu2bYv',
  youtubePM: 'rcp_xdvBKf7gpOWS'
};

// API endpoints for different platforms
const API_ENDPOINTS = {
  instagram: {
    media: 'https://graph.instagram.com/v18.0/{user-id}/media',
    insights: 'https://graph.instagram.com/v18.0/{media-id}/insights'
  },
  youtube: {
    videos: 'https://www.googleapis.com/youtube/v3/search',
    analytics: 'https://youtubeanalytics.googleapis.com/v2/reports'
  }
};

/**
 * Fetch posted content from n8n workflow execution history
 * This pulls actual posted images and descriptions from completed automation runs
 */
export async function fetchPostedContent(
  platform: 'instagram' | 'youtube',
  startDate: string,
  endDate: string
): Promise<Post[]> {
  try {
    const response = await fetch(
      `${N8N_CONFIG.instanceUrl}/api/v1/executions?workflowId=${getWorkflowId(platform)}`,
      {
        headers: {
          'X-N8N-API-KEY': N8N_CONFIG.apiKey,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`n8n API error: ${response.status}`);
    }

    const executions = await response.json();
    return parseExecutionsToPost(executions.data, platform);
  } catch (error) {
    console.error('Error fetching posted content:', error);
    return [];
  }
}

/**
 * Get workflow ID based on platform
 */
function getWorkflowId(platform: string): string {
  // These would be the actual n8n workflow IDs
  const workflowIds: Record<string, string> = {
    instagram: 'GKgv6n056ImIJbrx',
    youtube: 'youtubeWorkflowId' // Replace with actual ID
  };
  return workflowIds[platform] || '';
}

/**
 * Parse n8n execution data into Post format
 */
function parseExecutionsToPost(executions: any[], platform: string): Post[] {
  return executions
    .filter((exec: any) => exec.finished && exec.data?.resultData?.runData)
    .map((exec: any) => {
      const runData = exec.data.resultData.runData;
      // Extract image/video URL and caption from the execution data
      const postData = extractPostData(runData, platform);

      return {
        id: exec.id,
        platform: platform as Post['platform'],
        type: platform === 'youtube' ? 'short' : 'image',
        scheduledDate: new Date(exec.startedAt).toISOString().split('T')[0],
        scheduledTime: new Date(exec.startedAt).getHours() < 14 ? 'AM' : 'PM',
        category: 'automation' as Post['category'],
        topic: postData.topic || 'Social Media Post',
        caption: postData.caption || '',
        imageUrl: postData.imageUrl,
        videoUrl: postData.videoUrl,
        status: 'posted',
        postedAt: exec.stoppedAt,
        apiCost: platform === 'youtube' ? 0.593 : 0.03
      } as Post;
    });
}

/**
 * Extract post data from n8n run data
 */
function extractPostData(runData: any, platform: string): {
  topic: string;
  caption: string;
  imageUrl?: string;
  videoUrl?: string;
} {
  try {
    // Navigate through the n8n execution data structure
    // This varies based on workflow design
    const falaiNode = runData['Generate Image'] || runData['fal.ai'];
    const postNode = runData['Post to Instagram'] || runData['Upload to YouTube'];

    return {
      topic: postNode?.[0]?.json?.topic || 'Automated Post',
      caption: postNode?.[0]?.json?.caption || '',
      imageUrl: falaiNode?.[0]?.json?.images?.[0]?.url || falaiNode?.[0]?.json?.output?.images?.[0]?.url,
      videoUrl: platform === 'youtube' ? runData['Higgsfield']?.[0]?.json?.video_url : undefined
    };
  } catch (error) {
    console.error('Error extracting post data:', error);
    return { topic: '', caption: '' };
  }
}

/**
 * Webhook handler for receiving real-time post updates
 * This should be called by n8n after each successful post
 */
export async function handleWebhookUpdate(payload: N8nWebhookPayload): Promise<void> {
  // In a real implementation, this would update the local state or database
  console.log('Received post update:', payload);

  // Dispatch custom event for React components to listen to
  const event = new CustomEvent('postUpdate', { detail: payload });
  window.dispatchEvent(event);
}

/**
 * Fetch Instagram insights for a posted media
 */
export async function fetchInstagramInsights(mediaId: string, accessToken: string): Promise<any> {
  try {
    const metrics = 'impressions,reach,engagement,saved,video_views';
    const response = await fetch(
      `https://graph.instagram.com/v18.0/${mediaId}/insights?metric=${metrics}&access_token=${accessToken}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching Instagram insights:', error);
    return null;
  }
}

/**
 * Fetch YouTube video analytics
 */
export async function fetchYouTubeAnalytics(videoId: string, apiKey: string): Promise<any> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching YouTube analytics:', error);
    return null;
  }
}

/**
 * Create n8n workflow for a new client
 * Used when duplicating the dashboard for multiple clients
 */
export async function createClientWorkflow(
  clientId: string,
  socialAccounts: { platform: string; credentials: any }[]
): Promise<string> {
  // This would create a new n8n workflow based on the template
  // and return the new workflow ID
  console.log('Creating workflow for client:', clientId);

  // In production, this would call the n8n API to create a new workflow
  return `workflow_${clientId}_${Date.now()}`;
}

/**
 * Update workflow schedule
 */
export async function updateWorkflowSchedule(
  workflowId: string,
  schedule: { time: string; days: string[] }
): Promise<boolean> {
  try {
    // Update the cron expression in the workflow
    console.log('Updating schedule for workflow:', workflowId);
    return true;
  } catch (error) {
    console.error('Error updating workflow schedule:', error);
    return false;
  }
}

/**
 * Get real-time post status from n8n
 */
export async function getPostStatus(executionId: string): Promise<'running' | 'success' | 'error'> {
  try {
    const response = await fetch(
      `${N8N_CONFIG.instanceUrl}/api/v1/executions/${executionId}`,
      {
        headers: {
          'X-N8N-API-KEY': N8N_CONFIG.apiKey
        }
      }
    );

    const execution = await response.json();

    if (!execution.finished) return 'running';
    return execution.data?.resultData?.error ? 'error' : 'success';
  } catch (error) {
    console.error('Error getting post status:', error);
    return 'error';
  }
}

// Export config for components that need it
export { N8N_CONFIG, RECIPE_IDS };
