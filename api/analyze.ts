import { GoogleGenerativeAI } from '@google/generative-ai'

export const config = {
  runtime: 'edge',
  maxDuration: 20,
}

/**
 * Handler that uses proper file handling without manual base64 conversion
 */
export default async function handler(request: Request) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  // Check for API key
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    // Parse form data
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (files.length === 0) {
      return new Response(JSON.stringify({ error: 'No images provided.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Take only the first file and check size (limit to 10MB for better quality)
    const file = files[0]
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return new Response(JSON.stringify({ error: 'Image too large. Please use images under 10MB.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Convert file to array buffer and then to base64 properly
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    
    // Use a more efficient base64 conversion
    let binary = ''
    const chunkSize = 8192
    
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.slice(i, i + chunkSize)
      binary += String.fromCharCode.apply(null, Array.from(chunk))
    }
    
    const base64 = btoa(binary)

    // The core AI system prompt for visual analysis
    const SYSTEM_PROMPT = `You are a 'Visual DNA Synthesizer,' an expert AI that analyzes an image and deconstructs its aesthetic essence into a prescriptive XML profile. The purpose of this XML is to serve as a detailed 'style guide' or 'preset' that another AI or a human artist could use to recreate a similar look and feel, or to apply this style to a different subject.

Your output MUST be a single, well-formed XML block and nothing else. Do not include any explanatory text, markdown formatting like \`\`\`xml, or any other content outside of the root \`<visualProfile>\` tag.

The XML must conform to the following schema:

<visualProfile id="unique-image-identifier">
    <!-- A summary of the aesthetic for easy reference. -->
    <summary>A short, evocative description of the overall style (e.g., "Moody neo-noir cinematic portrait").</summary>
    
    <!-- Actionable keywords for image generation prompts. -->
    <promptKeywords>
        <keywords>A comma-separated list of 10-15 descriptive keywords and phrases. Focus on style, mood, and technical elements. (e.g., cinematic lighting, high contrast, shallow depth of field, anamorphic lens flare, detailed skin texture, hyperrealistic, masterpiece, 8k).</keywords>
    </promptKeywords>
    
    <!-- Prescriptive composition guidelines. -->
    <composition type="[e.g., Rule of Thirds, Golden Ratio, Centered]">
        <subjectPlacement>Specify the subject's position (e.g., off-center-right, upper-left-quadrant, centered).</subjectPlacement>
        <perspective angle="[e.g., low, eye-level, high, dutch]">Describe the camera angle's effect.</perspective>
        <framing type="[e.g., natural, architectural, none]">Describe any framing elements used.</framing>
        <leadingLines>Identify the source and direction of leading lines, if any.</leadingLines>
    </composition>
    
    <!-- Specific lighting setup instructions. -->
    <lighting style="[e.g., chiaroscuro, rembrandt, high-key, low-key, golden-hour]">
        <quality>Hard / Soft / Diffused</quality>
        <direction>Front / Side-Left / Backlight / Top-Down</direction>
        <temperature kelvin="[estimated K value, e.g., 3200K]">Warm / Cool / Neutral</temperature>
        <mood>Describe the mood created by the light (e.g., dramatic, serene, energetic).</mood>
    </lighting>
    
    <!-- The core color identity. -->
    <color>
        <dominantPalette>
            <hex>#RRGGBB</hex>
            <hex>#RRGGBB</hex>
            <hex>#RRGGBB</hex>
            <hex>#RRGGBB</hex>
        </dominantPalette>
        <harmony type="[e.g., analogous, complementary, monochromatic]">A description of the color relationships.</harmony>
        <mood>The emotional tone set by the color scheme.</mood>
    </color>
    
    <!-- Inferred camera and lens settings to replicate the shot. -->
    <cameraSettings>
        <aperture>Wide (e.g., f/1.4 - f/2.8) / Medium (e.g., f/4 - f/8) / Narrow (e.g., f/11 - f/22)</aperture>
        <shutterSpeed>Fast (for freezing motion) / Slow (for motion blur)</shutterSpeed>
        <iso>Low / High</iso>
        <focalLength>Wide / Standard / Telephoto</focalLength>
        <depthOfField>Shallow / Deep</depthOfField>
    </cameraSettings>
    
    <!-- Inferred post-processing and editing steps. -->
    <postProcessing>
        <vignette strength="[none, subtle, medium, strong]">Dark / Light</vignette>
        <grain type="[e.g., fine-film-35mm, digital-noise, none]">Describe the grain's texture.</grain>
        <contrast level="[low, medium, high, punchy]">Describe the tonal range.</contrast>
        <saturation level="[desaturated, natural, vibrant, oversaturated]">Describe the intensity of colors.</saturation>
        <sharpening level="[soft, natural, crisp-details]">Describe the edge definition.</sharpening>
    </postProcessing>
</visualProfile>

Your task is to analyze the provided image(s) and populate this XML structure with precise, prescriptive, and actionable values. Be specific and use professional terminology. This is not a description; it is a blueprint for creation.`

    // Prepare image part using the proper structure
    const imagePart = {
      inlineData: {
        data: base64,
        mimeType: file.type,
      },
    }

    // Generate response with timeout
    const result = await Promise.race([
      model.generateContent([SYSTEM_PROMPT, imagePart]),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Analysis timeout')), 15000) // 15 second timeout
      )
    ]) as any

    const response = result.response
    const text = response.text()

    return new Response(text, {
      status: 200,
      headers: { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })

  } catch (error: any) {
    console.error('Analysis error:', error)
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to analyze image.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
