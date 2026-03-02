import type { HubsResponse } from '@/types/hubs';
import type { LandingApiResponse, LandingImage } from '@/types/landing';
import { LandingType } from '@/types/landing';
import type { CategoryResponse } from '@/types/category';
import type { SectionItem, ImageSectionItem, SliderItem } from '@/types/sectionItem';
import { StrapiComponent } from '@/types/strapiComponent';
import { MediaType } from '@/types/media';

const IMG = (id: number, w = 800, h = 600) => `https://picsum.photos/id/${id}/${w}/${h}`;

// ---------------------------------------------------------------------------
// Effect definitions — every item that can appear on the site
// ---------------------------------------------------------------------------

interface EffectDef {
  name: string;
  slug: string;
  imgId: number;
  category: string;          // which category this belongs to
  description: string;
  prompt: string;
  uploadTitle: string;
  hasTextInput: boolean;
}

const allEffects: EffectDef[] = [
  // ── AI Effects ──────────────────────────────────────────────────────────
  { name: 'AI Portrait', slug: 'ai-portrait', imgId: 64, category: 'ai-effects', description: 'Transform any photo into a stunning AI-generated portrait with artistic flair. Choose from multiple styles including oil painting, watercolor, and digital art.', prompt: 'Create a professional AI portrait with artistic styling', uploadTitle: 'Upload your portrait photo', hasTextInput: true },
  { name: 'Background Remove', slug: 'background-remove', imgId: 91, category: 'ai-effects', description: 'Instantly remove backgrounds from any image with precision AI. Perfect for product photos, headshots, and creative compositing.', prompt: 'Remove the background from this image cleanly', uploadTitle: 'Upload image to remove background', hasTextInput: false },
  { name: 'Style Transfer', slug: 'style-transfer', imgId: 110, category: 'ai-effects', description: 'Apply the style of famous artworks to your photos. Transform everyday images into masterpieces inspired by Van Gogh, Monet, Picasso, and more.', prompt: 'Apply artistic style transfer to this image', uploadTitle: 'Upload your photo', hasTextInput: true },
  { name: 'Face Enhance', slug: 'face-enhance', imgId: 177, category: 'ai-effects', description: 'Enhance facial features in your photos using advanced AI. Improve lighting, smooth skin, sharpen details, and bring out natural beauty.', prompt: 'Enhance the face in this photo with natural-looking improvements', uploadTitle: 'Upload a face photo', hasTextInput: false },
  { name: 'Color Pop', slug: 'color-pop', imgId: 137, category: 'ai-effects', description: 'Make your photos stand out with vibrant AI color enhancement. Automatically boost saturation, fix white balance, and create eye-catching visuals.', prompt: 'Apply vibrant color pop effect to this image', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Sketch Effect', slug: 'sketch-effect', imgId: 160, category: 'ai-effects', description: 'Convert photos into beautiful pencil sketches and line drawings. Choose from realistic graphite, charcoal, ink pen, and architectural sketch styles.', prompt: 'Convert this photo into a detailed pencil sketch', uploadTitle: 'Upload a photo to sketch', hasTextInput: true },
  { name: 'Cartoon Filter', slug: 'cartoon-filter', imgId: 200, category: 'ai-effects', description: 'Turn your photos into fun cartoon-style illustrations. Create avatars, social media content, and playful versions of your favorite images.', prompt: 'Transform this image into a cartoon-style illustration', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Vintage Look', slug: 'vintage-look', imgId: 225, category: 'ai-effects', description: 'Add retro charm to your photos with authentic vintage effects. Simulate film grain, faded colors, light leaks, and classic camera aesthetics.', prompt: 'Apply a vintage retro film look to this image', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Neon Glow', slug: 'neon-glow', imgId: 250, category: 'ai-effects', description: 'Add electric neon glow effects to your images. Create cyberpunk-inspired visuals with vivid light trails, glowing outlines, and dramatic lighting.', prompt: 'Add neon glow and cyberpunk lighting effects', uploadTitle: 'Upload your photo', hasTextInput: true },
  { name: 'Watercolor', slug: 'watercolor', imgId: 274, category: 'ai-effects', description: 'Transform photos into beautiful watercolor paintings. AI recreates brush strokes, color bleeding, and paper texture for an authentic watercolor feel.', prompt: 'Convert this image into a watercolor painting', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Oil Painting', slug: 'oil-painting', imgId: 306, category: 'ai-effects', description: 'Create classic oil painting effects from your photos. Thick brush strokes, rich textures, and vivid colors bring gallery-worthy art to life.', prompt: 'Transform this photo into a classic oil painting', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Pixel Art', slug: 'pixel-art', imgId: 338, category: 'ai-effects', description: 'Convert images into retro pixel art style. Perfect for creating game assets, avatars, and nostalgic 8-bit and 16-bit inspired artwork.', prompt: 'Convert this image to pixel art style', uploadTitle: 'Upload your image', hasTextInput: true },
  { name: 'Pop Art', slug: 'pop-art', imgId: 349, category: 'ai-effects', description: 'Channel your inner Warhol with bold pop art transformations. Vibrant halftone dots, high-contrast colors, and comic-book aesthetics make every photo a statement piece.', prompt: 'Transform this photo into bold pop art', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Glitch Art', slug: 'glitch-art', imgId: 366, category: 'ai-effects', description: 'Create striking digital glitch effects with pixel displacement, RGB channel splitting, and data-bending artifacts. Perfect for album covers, posters, and social media.', prompt: 'Apply digital glitch and databend effects', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Low Poly', slug: 'low-poly', imgId: 399, category: 'ai-effects', description: 'Transform photos into stunning geometric low-poly art. Triangulated mesh rendering creates a modern, minimalist aesthetic ideal for wallpapers and prints.', prompt: 'Convert this image into low-poly geometric art', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Stained Glass', slug: 'stained-glass', imgId: 401, category: 'ai-effects', description: 'Recreate the luminous beauty of stained glass windows from your photos. Rich colors separated by dark leading lines bring cathedral-worthy artistry to any image.', prompt: 'Transform this image into a stained glass artwork', uploadTitle: 'Upload your image', hasTextInput: false },
  { name: 'Mosaic Tiles', slug: 'mosaic-tiles', imgId: 403, category: 'ai-effects', description: 'Turn your photos into intricate tile mosaics. Each tile is color-matched to recreate your image in a beautiful Roman or Byzantine mosaic style.', prompt: 'Create a tile mosaic from this image', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Double Exposure', slug: 'double-exposure', imgId: 411, category: 'ai-effects', description: 'Blend two worlds into one frame with cinematic double exposure effects. Merge portraits with landscapes, cityscapes, or abstract textures for artistic results.', prompt: 'Create a cinematic double exposure blend', uploadTitle: 'Upload your portrait', hasTextInput: true },
  { name: 'Bokeh Magic', slug: 'bokeh-magic', imgId: 425, category: 'ai-effects', description: 'Add dreamy bokeh light effects to your photos. Simulate shallow depth of field with beautiful circular or heart-shaped light orbs in the background.', prompt: 'Add bokeh background blur with light orbs', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Infrared Vision', slug: 'infrared-vision', imgId: 429, category: 'ai-effects', description: 'Simulate infrared photography with surreal color-shifted landscapes. Foliage turns white, skies go dark, and the world transforms into an alien dreamscape.', prompt: 'Apply infrared photography simulation', uploadTitle: 'Upload a landscape photo', hasTextInput: false },

  // ── Photo Editor ────────────────────────────────────────────────────────
  { name: 'Auto Retouch', slug: 'auto-retouch', imgId: 433, category: 'photo-editor', description: 'One-click professional retouching for portraits and selfies. Smooth skin, remove blemishes, whiten teeth, and brighten eyes while keeping a natural look.', prompt: 'Professionally retouch this portrait photo', uploadTitle: 'Upload a portrait to retouch', hasTextInput: false },
  { name: 'HDR Boost', slug: 'hdr-boost', imgId: 436, category: 'photo-editor', description: 'Bring out hidden details in shadows and highlights with intelligent HDR processing. Perfect for landscapes, architecture, and high-contrast scenes.', prompt: 'Apply HDR tone mapping to this image', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Smart Crop', slug: 'smart-crop', imgId: 439, category: 'photo-editor', description: 'AI-powered intelligent cropping that identifies the best composition for your photos. Automatically detects faces, subjects, and rule-of-thirds alignment.', prompt: 'Intelligently crop this image for best composition', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Noise Reduction', slug: 'noise-reduction', imgId: 442, category: 'photo-editor', description: 'Remove grain and digital noise from low-light and high-ISO photos while preserving sharp details. Rescue those dark concert shots and night photos.', prompt: 'Remove noise while preserving detail', uploadTitle: 'Upload a noisy photo', hasTextInput: false },
  { name: 'Super Resolution', slug: 'super-resolution', imgId: 447, category: 'photo-editor', description: 'Upscale images up to 4x without losing quality. AI fills in missing details to create sharp, high-resolution versions of low-res photos.', prompt: 'Upscale this image to 4x resolution', uploadTitle: 'Upload a low-res image', hasTextInput: false },
  { name: 'Object Eraser', slug: 'object-eraser', imgId: 452, category: 'photo-editor', description: 'Seamlessly remove unwanted objects, people, or text from your photos. AI intelligently fills the gap with matching background content.', prompt: 'Remove unwanted objects from this image', uploadTitle: 'Upload your photo', hasTextInput: true },
  { name: 'Sky Replacement', slug: 'sky-replacement', imgId: 456, category: 'photo-editor', description: 'Replace dull or overcast skies with stunning alternatives. Choose from golden sunsets, dramatic storm clouds, starry nights, and aurora borealis.', prompt: 'Replace the sky in this photo', uploadTitle: 'Upload a landscape photo', hasTextInput: true },
  { name: 'Color Grading', slug: 'color-grading', imgId: 459, category: 'photo-editor', description: 'Apply cinematic color grading presets inspired by Hollywood films. From teal-and-orange blockbusters to moody indie tones, transform the mood of any photo.', prompt: 'Apply cinematic color grading', uploadTitle: 'Upload your photo', hasTextInput: true },
  { name: 'Lens Blur', slug: 'lens-blur', imgId: 463, category: 'photo-editor', description: 'Add realistic depth-of-field blur using AI depth estimation. Simulate f/1.4 bokeh on any photo, even those shot on a smartphone.', prompt: 'Add realistic lens blur with depth of field', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Light Leak', slug: 'light-leak', imgId: 469, category: 'photo-editor', description: 'Add authentic analog film light leaks and flares to your digital photos. Warm golden, cool blue, and rainbow prismatic options available.', prompt: 'Add film light leak overlay', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Vignette Pro', slug: 'vignette-pro', imgId: 473, category: 'photo-editor', description: 'Apply subtle to dramatic vignette effects that draw the eye to your subject. Adjustable intensity, shape, and color for cinematic edge darkening.', prompt: 'Apply professional vignette effect', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Selective Color', slug: 'selective-color', imgId: 477, category: 'photo-editor', description: 'Isolate specific colors in your photo while converting the rest to black and white. Create dramatic, eye-catching compositions that highlight what matters.', prompt: 'Apply selective color isolation effect', uploadTitle: 'Upload your photo', hasTextInput: true },

  // ── Video Effects ───────────────────────────────────────────────────────
  { name: 'Slow Motion', slug: 'slow-motion', imgId: 482, category: 'video-effects', description: 'Create buttery smooth slow motion from any video using AI frame interpolation. Turn 30fps footage into cinematic 240fps super slow-mo.', prompt: 'Generate slow motion frames for this video', uploadTitle: 'Upload your video clip', hasTextInput: false },
  { name: 'Time Lapse', slug: 'time-lapse', imgId: 487, category: 'video-effects', description: 'Compress hours into seconds with AI-stabilized time-lapse creation. Perfect for sunsets, cloud movements, city traffic, and construction projects.', prompt: 'Create a time-lapse from this video', uploadTitle: 'Upload your video', hasTextInput: false },
  { name: 'Video Stabilize', slug: 'video-stabilize', imgId: 491, category: 'video-effects', description: 'Remove shaky camera motion with AI-powered stabilization. Smooth out handheld footage, action cam videos, and drone shots without cropping.', prompt: 'Stabilize this shaky video', uploadTitle: 'Upload a shaky video', hasTextInput: false },
  { name: 'Cinemagraph', slug: 'cinemagraph', imgId: 493, category: 'video-effects', description: 'Create mesmerizing cinemagraphs where only part of the image moves. Freeze a moment in time while water flows, hair blows, or candles flicker.', prompt: 'Create a cinemagraph from this video', uploadTitle: 'Upload a short video clip', hasTextInput: true },
  { name: 'Video Portrait', slug: 'video-portrait', imgId: 496, category: 'video-effects', description: 'Apply real-time AI portrait effects to video. Background blur, skin smoothing, and lighting correction that follows your face frame by frame.', prompt: 'Apply portrait enhancement to this video', uploadTitle: 'Upload your video', hasTextInput: false },
  { name: 'Scene Transition', slug: 'scene-transition', imgId: 500, category: 'video-effects', description: 'Add professional transitions between video scenes. Smooth morphs, particle dissolves, glitch cuts, and cinematic wipes powered by AI.', prompt: 'Add transitions between scenes', uploadTitle: 'Upload your video', hasTextInput: true },
  { name: 'Color Match', slug: 'color-match', imgId: 503, category: 'video-effects', description: 'Automatically match color grading across different video clips. Achieve consistent cinematic look across footage shot in different lighting conditions.', prompt: 'Match the color grading of these video clips', uploadTitle: 'Upload your video', hasTextInput: false },
  { name: 'AI Zoom', slug: 'ai-zoom', imgId: 506, category: 'video-effects', description: 'Create smooth Ken Burns-style zoom effects on any video or photo. AI detects the subject and creates natural, cinematic camera movements.', prompt: 'Apply AI-powered zoom and pan effect', uploadTitle: 'Upload your video or photo', hasTextInput: false },
  { name: 'Video Loop', slug: 'video-loop', imgId: 510, category: 'video-effects', description: 'Create perfectly seamless video loops from any clip. AI analyzes motion patterns and blends the end back into the beginning for infinite playback.', prompt: 'Create a seamless loop from this video', uploadTitle: 'Upload your video clip', hasTextInput: false },
  { name: 'Frame Interpolation', slug: 'frame-interpolation', imgId: 514, category: 'video-effects', description: 'Double or quadruple your video frame rate using AI motion estimation. Turn choppy 24fps into silky-smooth 60fps or even 120fps.', prompt: 'Interpolate frames to increase video smoothness', uploadTitle: 'Upload your video', hasTextInput: false },

  // ── AI Generate ─────────────────────────────────────────────────────────
  { name: 'Text to Image', slug: 'text-to-image', imgId: 519, category: 'ai-generate', description: 'Generate stunning images from text descriptions. Describe anything you can imagine and watch AI bring it to life with photorealistic or artistic quality.', prompt: 'Generate an image from the following description', uploadTitle: 'No upload needed', hasTextInput: true },
  { name: 'Image Variation', slug: 'image-variation', imgId: 522, category: 'ai-generate', description: 'Create unique variations of any image. AI generates multiple versions with different compositions, colors, and artistic interpretations while preserving the original concept.', prompt: 'Create artistic variations of this image', uploadTitle: 'Upload your reference image', hasTextInput: true },
  { name: 'Outpainting', slug: 'outpainting', imgId: 525, category: 'ai-generate', description: 'Extend your images beyond their borders. AI imagines what lies outside the frame and seamlessly generates new content that matches the style and context.', prompt: 'Extend this image beyond its current borders', uploadTitle: 'Upload an image to extend', hasTextInput: true },
  { name: 'Inpainting', slug: 'inpainting', imgId: 528, category: 'ai-generate', description: 'Fill in missing or masked areas of your images with AI-generated content. Repair damaged photos, remove objects, or replace regions with creative alternatives.', prompt: 'Fill in the masked area with generated content', uploadTitle: 'Upload your image', hasTextInput: true },
  { name: 'Face Generator', slug: 'face-generator', imgId: 532, category: 'ai-generate', description: 'Generate realistic human faces that don\'t exist. Perfect for placeholder avatars, character design concepts, and privacy-preserving content creation.', prompt: 'Generate a realistic human face', uploadTitle: 'No upload needed', hasTextInput: true },
  { name: 'Logo Creator', slug: 'logo-creator', imgId: 535, category: 'ai-generate', description: 'Design unique logo concepts from text descriptions. Specify your brand name, industry, and style preferences to get professional logo variations.', prompt: 'Generate a professional logo design', uploadTitle: 'No upload needed', hasTextInput: true },
  { name: 'Pattern Generator', slug: 'pattern-generator', imgId: 538, category: 'ai-generate', description: 'Create seamless repeating patterns for textiles, wallpapers, and packaging. Specify colors, motifs, and style for endless tileable designs.', prompt: 'Generate a seamless repeating pattern', uploadTitle: 'Upload a reference (optional)', hasTextInput: true },
  { name: 'Texture Synthesis', slug: 'texture-synthesis', imgId: 542, category: 'ai-generate', description: 'Generate high-resolution textures from small samples. Create realistic wood, stone, fabric, metal, and organic textures for 3D rendering and design.', prompt: 'Synthesize a seamless texture from this sample', uploadTitle: 'Upload a texture sample', hasTextInput: true },
  { name: 'Scene Generator', slug: 'scene-generator', imgId: 545, category: 'ai-generate', description: 'Create complete scenes from text descriptions. Generate landscapes, interiors, cityscapes, and fantasy worlds with consistent lighting and perspective.', prompt: 'Generate a detailed scene from this description', uploadTitle: 'No upload needed', hasTextInput: true },
  { name: 'Character Design', slug: 'character-design', imgId: 548, category: 'ai-generate', description: 'Design original characters from text descriptions. Generate concept art for games, animations, comics, and stories with consistent style across poses.', prompt: 'Design an original character from this description', uploadTitle: 'Upload a reference (optional)', hasTextInput: true },

  // ── Design Tools ────────────────────────────────────────────────────────
  { name: 'Image to SVG', slug: 'image-to-svg', imgId: 552, category: 'design-tools', description: 'Convert raster images to clean scalable vector graphics. AI traces edges and creates smooth paths, perfect for logos, icons, and illustrations.', prompt: 'Convert this image to vector SVG format', uploadTitle: 'Upload your image', hasTextInput: false },
  { name: 'Color Palette', slug: 'color-palette', imgId: 555, category: 'design-tools', description: 'Extract harmonious color palettes from any image. Get hex codes, RGB values, and complementary color suggestions for your design projects.', prompt: 'Extract a color palette from this image', uploadTitle: 'Upload your image', hasTextInput: false },
  { name: 'Font Identifier', slug: 'font-identifier', imgId: 558, category: 'design-tools', description: 'Identify fonts from any image using AI visual recognition. Upload a screenshot of text and get the closest matching font names and download links.', prompt: 'Identify the font in this image', uploadTitle: 'Upload an image with text', hasTextInput: false },
  { name: 'Mockup Generator', slug: 'mockup-generator', imgId: 561, category: 'design-tools', description: 'Place your designs on realistic product mockups. T-shirts, mugs, phones, billboards, and more — see your work in context before production.', prompt: 'Place this design on a product mockup', uploadTitle: 'Upload your design', hasTextInput: true },
  { name: 'Layout Generator', slug: 'layout-generator', imgId: 564, category: 'design-tools', description: 'Generate balanced page layouts for posters, social media posts, and presentations. AI suggests compositions based on your content and dimensions.', prompt: 'Generate an optimized layout for this content', uploadTitle: 'Upload your content elements', hasTextInput: true },
  { name: 'QR Art', slug: 'qr-art', imgId: 567, category: 'design-tools', description: 'Create artistic QR codes that are both scannable and visually stunning. Integrate QR codes with custom artwork, logos, and illustrations.', prompt: 'Create an artistic QR code design', uploadTitle: 'Upload your logo (optional)', hasTextInput: true },
  { name: 'Collage Maker', slug: 'collage-maker', imgId: 570, category: 'design-tools', description: 'Arrange multiple photos into beautiful collage layouts. AI suggests compositions, adjusts sizing, and maintains visual harmony across all images.', prompt: 'Create a beautiful collage from these images', uploadTitle: 'Upload photos for collage', hasTextInput: false },
  { name: 'Poster Design', slug: 'poster-design', imgId: 573, category: 'design-tools', description: 'Create eye-catching poster designs with AI assistance. From concert flyers to movie posters, get professional-quality designs with smart typography placement.', prompt: 'Design a poster with this content', uploadTitle: 'Upload your images', hasTextInput: true },

  // ── Face & Body ─────────────────────────────────────────────────────────
  { name: 'Age Transform', slug: 'age-transform', imgId: 576, category: 'face-body', description: 'See yourself at any age with AI age progression and regression. Preview your future self or travel back in time — realistic aging effects for portraits.', prompt: 'Transform the age of the person in this photo', uploadTitle: 'Upload a face photo', hasTextInput: true },
  { name: 'Gender Swap', slug: 'gender-swap', imgId: 579, category: 'face-body', description: 'See what you would look like as a different gender. AI morphs facial features while maintaining recognizable characteristics for fun results.', prompt: 'Swap the gender presentation in this photo', uploadTitle: 'Upload a face photo', hasTextInput: false },
  { name: 'Hair Color', slug: 'hair-color', imgId: 582, category: 'face-body', description: 'Preview different hair colors before committing to a change. Try blonde, brunette, red, blue, pink, and every shade imaginable on your own photo.', prompt: 'Change the hair color in this photo', uploadTitle: 'Upload a portrait photo', hasTextInput: true },
  { name: 'Makeup Try-On', slug: 'makeup-try-on', imgId: 585, category: 'face-body', description: 'Try on different makeup looks virtually. From natural everyday looks to dramatic evening styles, preview lipstick, eyeshadow, blush, and more.', prompt: 'Apply virtual makeup to this face', uploadTitle: 'Upload a selfie', hasTextInput: true },
  { name: 'Face Swap', slug: 'face-swap', imgId: 588, category: 'face-body', description: 'Swap faces between two photos with seamless AI blending. Lighting, skin tone, and perspective are automatically matched for realistic results.', prompt: 'Swap the face from the source to the target', uploadTitle: 'Upload the source face', hasTextInput: false },
  { name: 'Expression Change', slug: 'expression-change', imgId: 591, category: 'face-body', description: 'Change facial expressions in photos. Turn a neutral face into a smile, surprise, or any emotion while maintaining natural-looking results.', prompt: 'Change the facial expression in this photo', uploadTitle: 'Upload a portrait', hasTextInput: true },
  { name: 'Body Reshape', slug: 'body-reshape', imgId: 594, category: 'face-body', description: 'Adjust body proportions in photos with natural-looking AI editing. Slim, enhance, or reshape while maintaining realistic proportions and background integrity.', prompt: 'Reshape the body proportions in this photo', uploadTitle: 'Upload your photo', hasTextInput: false },
  { name: 'Tattoo Preview', slug: 'tattoo-preview', imgId: 597, category: 'face-body', description: 'Preview tattoo designs on your body before getting inked. Upload your tattoo design and see how it looks on different body parts with realistic rendering.', prompt: 'Preview this tattoo design on the body', uploadTitle: 'Upload your tattoo design', hasTextInput: true },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const byCategory = (cat: string) => allEffects.filter(e => e.category === cat);

const makeSectionItem = (effect: EffectDef, index: number): ImageSectionItem => ({
  id: String(index + 1),
  title: effect.name,
  description: effect.description,
  url: `/${effect.slug}`,
  redirectUrl: `/${effect.slug}`,
  slug: effect.slug,
  image: IMG(effect.imgId),
  video: null,
  type: MediaType.IMAGE,
  media: {
    id: index + 1,
    ext: '.jpg',
    mime: 'image/jpeg',
    width: 800,
    height: 600 + (index % 4) * 80,
    url: IMG(effect.imgId, 800, 600 + (index % 4) * 80),
  },
});

const makeSliderItem = (effect: EffectDef, index: number, categorySlug: string): SliderItem => ({
  id: index + 1000,
  title: effect.name,
  description: effect.description,
  url: `/${categorySlug}/${effect.slug}`,
  slug: `${categorySlug}/${effect.slug}`,
  video: {
    id: index + 1000,
    media: {
      id: index + 1000,
      ext: '.jpg',
      mime: 'image/jpeg',
      width: 640,
      height: 360,
      url: IMG(effect.imgId, 640, 360),
      poster: IMG(effect.imgId, 640, 360),
    },
  },
  media: {
    id: index + 1000,
    ext: '.jpg',
    mime: 'image/jpeg',
    width: 640,
    height: 360,
    url: IMG(effect.imgId, 640, 360),
    poster: IMG(effect.imgId, 640, 360),
  },
});

const makeRelatedItem = (effect: EffectDef, index: number): ImageSectionItem => ({
  id: String(index + 5000),
  title: effect.name,
  description: effect.description,
  url: `/${effect.category}/${effect.slug}`,
  redirectUrl: `/${effect.category}/${effect.slug}`,
  slug: `${effect.category}/${effect.slug}`,
  image: IMG(effect.imgId),
  video: null,
  type: MediaType.IMAGE,
  media: {
    id: index + 5000,
    ext: '.jpg',
    mime: 'image/jpeg',
    width: 800,
    height: 600 + (index % 4) * 80,
    url: IMG(effect.imgId, 800, 600 + (index % 4) * 80),
  },
});

// ---------------------------------------------------------------------------
// Per-category grid items
// ---------------------------------------------------------------------------

const aiEffectsItems = byCategory('ai-effects').map((e, i) => makeSectionItem(e, i));
const photoEditorItems = byCategory('photo-editor').map((e, i) => makeSectionItem(e, i + 100));
const videoEffectsItems = byCategory('video-effects').map((e, i) => makeSectionItem(e, i + 200));
const aiGenerateItems = byCategory('ai-generate').map((e, i) => makeSectionItem(e, i + 300));
const designToolsItems = byCategory('design-tools').map((e, i) => makeSectionItem(e, i + 400));
const faceBodyItems = byCategory('face-body').map((e, i) => makeSectionItem(e, i + 500));

// Featured slider — mix from different categories
const featuredSlider: SliderItem[] = [
  makeSliderItem(allEffects[0], 0, 'ai-effects'),       // AI Portrait
  makeSliderItem(allEffects[20], 1, 'photo-editor'),     // Auto Retouch
  makeSliderItem(allEffects[40], 2, 'ai-generate'),      // Text to Image
  makeSliderItem(allEffects[8], 3, 'ai-effects'),        // Neon Glow
  makeSliderItem(allEffects[35], 4, 'video-effects'),    // Cinemagraph
  makeSliderItem(allEffects[56], 5, 'face-body'),        // Age Transform
  makeSliderItem(allEffects[50], 6, 'design-tools'),     // Image to SVG
  makeSliderItem(allEffects[44], 7, 'ai-generate'),      // Face Generator
];

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------

const defaultSeoSettings = {
  title: 'hrakAi Studio - AI Image & Video Generator',
  metaDescription: 'Create stunning AI-generated images and videos with hrakAi Studio. 70+ AI tools for photo editing, video effects, image generation, and design.',
  ogTitle: 'hrakAi Studio',
  ogDescription: 'AI-powered creative tools',
  ogImage: IMG(1),
  canonicalUrl: 'http://localhost:3000',
};

// ---------------------------------------------------------------------------
// Hub (home page) — 7 sections
// ---------------------------------------------------------------------------

export const mockHub: HubsResponse = {
  data: {
    id: 1,
    documentId: 'mock-hub-document-id',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    publishedAt: '2025-01-01T00:00:00.000Z',
    locale: 'en',
    title: 'hrakAi Studio',
    slug: 'home',
    seoSettings: defaultSeoSettings,
    components: [
      {
        __component: StrapiComponent.SectionSlider,
        id: 1,
        title: 'Featured',
        items: featuredSlider,
        priority: true,
      },
      {
        __component: StrapiComponent.SectionGrid,
        id: 2,
        title: 'AI Effects',
        slug: 'ai-effects',
        items: aiEffectsItems,
        tags: [{ id: 1, name: 'trending' }, { id: 2, name: 'new' }],
      },
      {
        __component: StrapiComponent.SectionGrid,
        id: 3,
        title: 'Photo Editor',
        slug: 'photo-editor',
        items: photoEditorItems,
        tags: [{ id: 3, name: 'popular' }],
      },
      {
        __component: StrapiComponent.SectionGrid,
        id: 4,
        title: 'Video Effects',
        slug: 'video-effects',
        items: videoEffectsItems,
      },
      {
        __component: StrapiComponent.SectionGrid,
        id: 5,
        title: 'AI Generate',
        slug: 'ai-generate',
        items: aiGenerateItems,
        tags: [{ id: 4, name: 'hot' }, { id: 5, name: 'creative' }],
      },
      {
        __component: StrapiComponent.SectionGrid,
        id: 6,
        title: 'Design Tools',
        slug: 'design-tools',
        items: designToolsItems,
      },
      {
        __component: StrapiComponent.SectionGrid,
        id: 7,
        title: 'Face & Body',
        slug: 'face-body',
        items: faceBodyItems,
        tags: [{ id: 6, name: 'fun' }],
      },
    ],
    localizations: [],
  },
  meta: { pagination: { start: 0, limit: 25, total: 1 } },
};

// ---------------------------------------------------------------------------
// Landing (detail page)
// ---------------------------------------------------------------------------

const findEffect = (slug: string): EffectDef =>
  allEffects.find(e => e.slug === slug) ?? allEffects[0];

export const makeMockLanding = (category: string, slug: string): LandingApiResponse => {
  const effect = findEffect(slug);

  const image: LandingImage[] = [{
    id: 1,
    alt: effect.name,
    media: {
      id: 1,
      name: `${slug}.jpg`,
      alternativeText: effect.name,
      ext: '.jpg',
      mime: 'image/jpeg',
      url: IMG(effect.imgId, 800, 600),
      width: 800,
      height: 600,
      formats: {
        large: { ext: '.jpg', mime: 'image/jpeg', name: `${slug}-lg.jpg`, url: IMG(effect.imgId, 1000, 750), width: 1000, height: 750 },
        medium: { ext: '.jpg', mime: 'image/jpeg', name: `${slug}-md.jpg`, url: IMG(effect.imgId, 750, 562), width: 750, height: 562 },
        small: { ext: '.jpg', mime: 'image/jpeg', name: `${slug}-sm.jpg`, url: IMG(effect.imgId, 500, 375), width: 500, height: 375 },
        thumbnail: { ext: '.jpg', mime: 'image/jpeg', name: `${slug}-thumb.jpg`, url: IMG(effect.imgId, 200, 150), width: 200, height: 150 },
      },
    },
  }];

  return {
    data: {
      id: 1,
      documentId: `mock-landing-${slug}`,
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
      publishedAt: '2025-01-01T00:00:00.000Z',
      locale: 'en',
      title: effect.name,
      slug,
      description: effect.description,
      type: MediaType.IMAGE,
      prompt: effect.prompt,
      redirectionUrl: '/',
      image,
      video: [],
      tags: [{ id: 1, name: category }],
      uploadItems: [
        {
          id: 1,
          type: MediaType.IMAGE,
          title: effect.uploadTitle,
          extensions: ['.jpg', '.jpeg', '.png', '.webp'],
        },
      ],
      textItems: effect.hasTextInput
        ? [{ type: 'text', id: 'prompt-input' }]
        : [],
      button: {
        id: 1,
        title: 'Generate',
        ariaLabel: `Generate ${effect.name} effect`,
        icon: null,
      },
      transformations: [],
      landingType: LandingType.BASIC,
      seoSettings: {
        ...defaultSeoSettings,
        title: `${effect.name} - hrakAi Studio`,
        metaDescription: effect.description,
        ogTitle: `${effect.name} - hrakAi Studio`,
        ogDescription: effect.description,
        ogImage: IMG(effect.imgId),
        canonicalUrl: `http://localhost:3000/${category}/${slug}`,
      },
    },
    meta: { pagination: { start: 0, limit: 25, total: 1 } },
  };
};

// ---------------------------------------------------------------------------
// Category page
// ---------------------------------------------------------------------------

const categoryItemsMap: Record<string, ImageSectionItem[]> = {
  'ai-effects': aiEffectsItems,
  'photo-editor': photoEditorItems,
  'video-effects': videoEffectsItems,
  'ai-generate': aiGenerateItems,
  'design-tools': designToolsItems,
  'face-body': faceBodyItems,
};

const categoryDescriptions: Record<string, string> = {
  'ai-effects': 'Transform your photos with 20 AI-powered artistic effects — from portraits and sketches to neon glows and infrared visions.',
  'photo-editor': 'Professional photo editing tools powered by AI. Retouch, enhance, upscale, and perfect every shot.',
  'video-effects': 'Cinematic video effects including slow motion, stabilization, cinemagraphs, and intelligent frame interpolation.',
  'ai-generate': 'Create images from scratch with text-to-image, outpainting, inpainting, and pattern generation tools.',
  'design-tools': 'Design utilities for SVG conversion, color palettes, mockups, QR art, and poster creation.',
  'face-body': 'Fun and creative face & body transformations — age progression, hair color, makeup, tattoo previews, and more.',
};

export const makeMockCategory = (slug: string): CategoryResponse => ({
  data: {
    id: 1,
    documentId: `mock-category-${slug}`,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    publishedAt: '2025-01-01T00:00:00.000Z',
    locale: 'en',
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    slug,
    description: categoryDescriptions[slug] ?? `Explore ${slug.replace(/-/g, ' ')} — AI-powered creative tools`,
    seoSettings: {
      ...defaultSeoSettings,
      title: `${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} - hrakAi Studio`,
    },
    items: categoryItemsMap[slug] ?? aiEffectsItems,
  },
  meta: { pagination: { start: 0, limit: 25, total: (categoryItemsMap[slug] ?? aiEffectsItems).length } },
});

// ---------------------------------------------------------------------------
// Related landings (similar presets on detail page)
// SimilarPresets renders SectionGrid WITHOUT a category slug prop,
// so getRedirectionUrl uses only itemSlug — slug must be the full path.
// ---------------------------------------------------------------------------

export const mockRelatedLandings: SectionItem[] =
  allEffects.slice(0, 8).map((e, i) => makeRelatedItem(e, i));
