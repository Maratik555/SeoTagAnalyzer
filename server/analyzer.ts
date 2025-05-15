import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { SeoAnalysisResponse, MetaTag, MetaTagStatus } from "@shared/schema";

// Maximum recommended lengths for various meta tags
const MAX_LENGTHS = {
  title: 60,
  description: 160,
  keywords: 200,
  ogTitle: 60,
  ogDescription: 160,
  twitterTitle: 60,
  twitterDescription: 160,
};

/**
 * Analyze SEO meta tags from a given URL
 */
export async function analyzeSeoMetaTags(url: string): Promise<SeoAnalysisResponse> {
  try {
    // Fetch the HTML content
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch the website: ${response.status} ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Parse the HTML using cheerio
    const $ = cheerio.load(html);
    
    // Extract and analyze meta tags
    const metaTags: MetaTag[] = [];
    let success = 0;
    let warnings = 0;
    let errors = 0;
    
    // Extract title
    const title = $("title").text().trim();
    const titleLength = title.length;
    let titleStatus: MetaTagStatus = "success";
    let titleDescription = "Хорошая длина заголовка с релевантными ключевыми словами.";
    
    if (!title) {
      titleStatus = "error";
      titleDescription = "Тег title отсутствует.";
      errors++;
    } else if (titleLength > MAX_LENGTHS.title) {
      titleStatus = "warning";
      titleDescription = `Заголовок слишком длинный (${titleLength} символов). Рекомендуемая максимальная длина: ${MAX_LENGTHS.title} символов.`;
      warnings++;
    } else if (titleLength < 10) {
      titleStatus = "warning";
      titleDescription = `Заголовок слишком короткий (${titleLength} символов). Рекомендуемая минимальная длина: 10 символов.`;
      warnings++;
    } else {
      success++;
    }
    
    metaTags.push({
      name: "Заголовок (Title)",
      value: title ? `<title>${title}</title>` : undefined,
      status: titleStatus,
      description: titleDescription,
      lengthMax: MAX_LENGTHS.title,
      lengthCurrent: titleLength
    });
    
    // Extract meta description
    const description = $('meta[name="description"]').attr("content") || "";
    const descriptionLength = description.length;
    let descriptionStatus: MetaTagStatus = "success";
    let descriptionDesc = "Хорошая длина описания с релевантной информацией.";
    
    if (!description) {
      descriptionStatus = "error";
      descriptionDesc = "Мета-тег description отсутствует.";
      errors++;
    } else if (descriptionLength > MAX_LENGTHS.description) {
      descriptionStatus = "warning";
      descriptionDesc = `Описание слишком длинное (${descriptionLength} символов). Рекомендуемая максимальная длина: ${MAX_LENGTHS.description} символов.`;
      warnings++;
    } else if (descriptionLength < 50) {
      descriptionStatus = "warning";
      descriptionDesc = `Описание слишком короткое (${descriptionLength} символов). Рекомендуемая минимальная длина: 50 символов.`;
      warnings++;
    } else {
      success++;
    }
    
    metaTags.push({
      name: "Описание (Description)",
      value: description ? `<meta name="description" content="${description}" />` : undefined,
      status: descriptionStatus,
      description: descriptionDesc,
      lengthMax: MAX_LENGTHS.description,
      lengthCurrent: descriptionLength
    });
    
    // Extract canonical URL
    const canonical = $('link[rel="canonical"]').attr("href") || "";
    let canonicalStatus: MetaTagStatus = "success";
    let canonicalDesc = "Канонический URL правильно определен.";
    
    if (!canonical) {
      canonicalStatus = "warning";
      canonicalDesc = "Канонический URL отсутствует.";
      warnings++;
    } else if (!canonical.startsWith("http")) {
      canonicalStatus = "error";
      canonicalDesc = "Канонический URL недействителен. Должен быть абсолютным URL.";
      errors++;
    } else {
      success++;
    }
    
    metaTags.push({
      name: "Канонический URL",
      value: canonical ? `<link rel="canonical" href="${canonical}" />` : undefined,
      status: canonicalStatus,
      description: canonicalDesc
    });
    
    // Extract viewport
    const viewport = $('meta[name="viewport"]').attr("content") || "";
    let viewportStatus: MetaTagStatus = "success";
    let viewportDesc = "Viewport правильно настроен для мобильных устройств.";
    
    if (!viewport) {
      viewportStatus = "error";
      viewportDesc = "Мета-тег viewport отсутствует. Это влияет на отображение на мобильных устройствах.";
      errors++;
    } else if (!viewport.includes("width=device-width")) {
      viewportStatus = "warning";
      viewportDesc = "Мета-тег viewport должен включать 'width=device-width' для корректной адаптивности.";
      warnings++;
    } else {
      success++;
    }
    
    metaTags.push({
      name: "Мобильный вид (Viewport)",
      value: viewport ? `<meta name="viewport" content="${viewport}" />` : undefined,
      status: viewportStatus,
      description: viewportDesc
    });
    
    // Extract robots
    const robots = $('meta[name="robots"]').attr("content") || "";
    let robotsStatus: MetaTagStatus = "success";
    let robotsDesc = "Мета-тег robots правильно настроен.";
    
    if (!robots) {
      robotsStatus = "warning";
      robotsDesc = "Мета-тег robots отсутствует. Это может повлиять на индексацию страницы поисковыми системами.";
      warnings++;
    } else if (robots.includes("noindex")) {
      robotsStatus = "warning";
      robotsDesc = "Страница помечена как 'noindex', что предотвращает ее появление в результатах поиска.";
      warnings++;
    } else {
      success++;
    }
    
    metaTags.push({
      name: "Индексация (Robots)",
      value: robots ? `<meta name="robots" content="${robots}" />` : undefined,
      status: robotsStatus,
      description: robotsDesc
    });
    
    // Extract Open Graph tags
    const ogTags: Record<string, string | undefined> = {};
    const ogTitle = $('meta[property="og:title"]').attr("content") || "";
    const ogDescription = $('meta[property="og:description"]').attr("content") || "";
    const ogImage = $('meta[property="og:image"]').attr("content") || "";
    const ogUrl = $('meta[property="og:url"]').attr("content") || "";
    const ogType = $('meta[property="og:type"]').attr("content") || "";
    
    ogTags["og:title"] = ogTitle;
    ogTags["og:description"] = ogDescription;
    ogTags["og:image"] = ogImage;
    ogTags["og:url"] = ogUrl;
    ogTags["og:type"] = ogType;
    
    // Analyze OG title
    let ogTitleStatus: MetaTagStatus = "success";
    let ogTitleDesc = "Open Graph заголовок хорошо определен.";
    
    if (!ogTitle) {
      ogTitleStatus = "warning";
      ogTitleDesc = "Open Graph заголовок отсутствует. Социальные сети могут использовать тег title вместо него.";
      warnings++;
    } else if (ogTitle.length > MAX_LENGTHS.ogTitle) {
      ogTitleStatus = "warning";
      ogTitleDesc = `Open Graph заголовок слишком длинный (${ogTitle.length} символов). Рекомендуемая максимальная длина: ${MAX_LENGTHS.ogTitle} символов.`;
      warnings++;
    } else {
      success++;
    }
    
    metaTags.push({
      name: "Заголовок Open Graph",
      value: ogTitle ? `<meta property="og:title" content="${ogTitle}" />` : undefined,
      status: ogTitleStatus,
      description: ogTitleDesc,
      lengthMax: MAX_LENGTHS.ogTitle,
      lengthCurrent: ogTitle.length
    });
    
    // Analyze OG description
    let ogDescStatus: MetaTagStatus = "success";
    let ogDescDesc = "Описание Open Graph хорошо определено.";
    
    if (!ogDescription) {
      ogDescStatus = "warning";
      ogDescDesc = "Описание Open Graph отсутствует. Социальные сети могут использовать мета-описание вместо него.";
      warnings++;
    } else if (ogDescription.length > MAX_LENGTHS.ogDescription) {
      ogDescStatus = "warning";
      ogDescDesc = `Описание Open Graph слишком длинное (${ogDescription.length} символов). Рекомендуемая максимальная длина: ${MAX_LENGTHS.ogDescription} символов.`;
      warnings++;
    } else {
      success++;
    }
    
    metaTags.push({
      name: "Описание Open Graph",
      value: ogDescription ? `<meta property="og:description" content="${ogDescription}" />` : undefined,
      status: ogDescStatus,
      description: ogDescDesc,
      lengthMax: MAX_LENGTHS.ogDescription,
      lengthCurrent: ogDescription.length
    });
    
    // Analyze OG image
    let ogImageStatus: MetaTagStatus = "success";
    let ogImageDesc = "Изображение Open Graph хорошо определено.";
    
    if (!ogImage) {
      ogImageStatus = "error";
      ogImageDesc = "Изображение Open Graph отсутствует. Это критично для отображения в социальных сетях.";
      errors++;
    } else if (!ogImage.startsWith("http")) {
      ogImageStatus = "error";
      ogImageDesc = "URL изображения Open Graph должен быть абсолютным, а не относительным.";
      errors++;
    } else {
      success++;
    }
    
    metaTags.push({
      name: "Изображение Open Graph",
      value: ogImage ? `<meta property="og:image" content="${ogImage}" />` : undefined,
      status: ogImageStatus,
      description: ogImageDesc
    });
    
    // Extract Twitter Card tags
    const twitterTags: Record<string, string | undefined> = {};
    const twitterCard = $('meta[name="twitter:card"]').attr("content") || "";
    const twitterTitle = $('meta[name="twitter:title"]').attr("content") || "";
    const twitterDescription = $('meta[name="twitter:description"]').attr("content") || "";
    const twitterImage = $('meta[name="twitter:image"]').attr("content") || "";
    const twitterSite = $('meta[name="twitter:site"]').attr("content") || "";
    
    twitterTags["twitter:card"] = twitterCard;
    twitterTags["twitter:title"] = twitterTitle;
    twitterTags["twitter:description"] = twitterDescription;
    twitterTags["twitter:image"] = twitterImage;
    twitterTags["twitter:site"] = twitterSite;
    
    // Analyze Twitter card
    let twitterCardStatus: MetaTagStatus = "success";
    let twitterCardDesc = "Карточка Twitter хорошо определена.";
    
    if (!twitterCard) {
      twitterCardStatus = "warning";
      twitterCardDesc = "Тип карточки Twitter отсутствует. Twitter будет использовать карточку по умолчанию.";
      warnings++;
    } else if (!["summary", "summary_large_image", "app", "player"].includes(twitterCard)) {
      twitterCardStatus = "warning";
      twitterCardDesc = `Неизвестный тип карточки Twitter: "${twitterCard}". Допустимые типы: summary, summary_large_image, app, player.`;
      warnings++;
    } else {
      success++;
    }
    
    metaTags.push({
      name: "Карточка Twitter",
      value: twitterCard ? `<meta name="twitter:card" content="${twitterCard}" />` : undefined,
      status: twitterCardStatus,
      description: twitterCardDesc
    });
    
    // Analyze Twitter image
    let twitterImageStatus: MetaTagStatus = "success";
    let twitterImageDesc = "Изображение Twitter хорошо определено.";
    
    if (!twitterImage) {
      twitterImageStatus = "warning";
      twitterImageDesc = "Изображение Twitter отсутствует. Twitter попытается использовать изображение Open Graph вместо него.";
      
      // Only count as a warning if no OG image either
      if (!ogImage) {
        warnings++;
      }
    } else if (!twitterImage.startsWith("http")) {
      twitterImageStatus = "error";
      twitterImageDesc = "URL изображения Twitter должен быть абсолютным, а не относительным.";
      errors++;
    } else {
      success++;
    }
    
    metaTags.push({
      name: "Изображение Twitter",
      value: twitterImage ? `<meta name="twitter:image" content="${twitterImage}" />` : undefined,
      status: twitterImageStatus,
      description: twitterImageDesc
    });
    
    // Generate recommendations based on the analysis
    const recommendations = [];
    
    // Title recommendations
    if (titleStatus === "error") {
      recommendations.push({
        type: "error" as MetaTagStatus,
        title: "Добавьте тег заголовка",
        description: "Каждая страница должна иметь уникальный и описательный тег заголовка. Это критически важно для SEO.",
        example: "<title>Ваше основное ключевое слово | Название бренда</title>"
      });
    } else if (titleStatus === "warning") {
      recommendations.push({
        type: "warning" as MetaTagStatus,
        title: "Оптимизируйте тег заголовка",
        description: `Ваш заголовок ${titleLength > MAX_LENGTHS.title ? "превышает" : "меньше"} рекомендуемой длины. Стремитесь к 50-60 символам.`,
        example: "<title>Краткий и информативный заголовок | Название бренда</title>"
      });
    }
    
    // Description recommendations
    if (descriptionStatus === "error") {
      recommendations.push({
        type: "error" as MetaTagStatus,
        title: "Добавьте мета-описание",
        description: "Мета-описания предоставляют резюме содержимого вашей страницы и отображаются в результатах поиска.",
        example: '<meta name="description" content="Привлекательное описание на 150-160 символов, которое включает основные ключевые слова и стимулирует клики." />'
      });
    } else if (descriptionStatus === "warning") {
      recommendations.push({
        type: "warning" as MetaTagStatus,
        title: "Улучшите мета-описание",
        description: `Ваше описание ${descriptionLength > MAX_LENGTHS.description ? "превышает" : "меньше"} идеальной длины. Стремитесь к 150-160 символам с релевантными ключевыми словами.`,
        example: '<meta name="description" content="Четкое и краткое описание страницы, включающее основные ключевые слова и призыв к действию, в пределах 150-160 символов." />'
      });
    }
    
    // OG Image recommendations
    if (ogImageStatus === "error") {
      recommendations.push({
        type: "error" as MetaTagStatus,
        title: "Добавьте изображение Open Graph",
        description: "Изображение Open Graph необходимо для привлекательного отображения при публикации в социальных сетях. Используйте качественное изображение размером не менее 1200x630 пикселей.",
        example: '<meta property="og:image" content="https://example.com/images/og-image.jpg" />\n<meta property="og:image:width" content="1200" />\n<meta property="og:image:height" content="630" />'
      });
    }
    
    // Twitter Card recommendations
    if (twitterCardStatus === "warning") {
      recommendations.push({
        type: "warning" as MetaTagStatus,
        title: "Добавьте мета-теги Twitter Card",
        description: "Карточки Twitter делают ваш контент более привлекательным при публикации в Twitter.",
        example: '<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:site" content="@yourusername" />'
      });
    }
    
    // Calculate overall score (0-100)
    // Simple algorithm: 100 - (warnings * 5) - (errors * 15)
    let score = 100 - (warnings * 5) - (errors * 15);
    score = Math.max(0, Math.min(100, score)); // Clamp between 0-100
    
    return {
      url,
      title,
      description,
      score,
      metaTags,
      success,
      warnings,
      errors,
      recommendations,
      ogTags,
      twitterTags
    };
  } catch (error) {
    // Re-throw the error to be handled by the route handler
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred during analysis");
  }
}
