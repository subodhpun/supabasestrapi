// 'use strict';

// /**
//  * article service
//  */

// const { createCoreService } = require('@strapi/strapi').factories;

// module.exports = createCoreService('api::article.article');

'use strict';

/**
 * article service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article.article', ({ strapi }) => ({
  async create(params) {
    const { data } = params;
    
    // Generate full image URL if FeaturedIMage exists
    if (data.FeaturedIMage && data.FeaturedIMage.length > 0) {
      const imageUrl = data.FeaturedIMage[0].url;
      if (imageUrl) {
        data.featured_image_url = `https://supabasestrapi.onrender.com${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
      }
    }
    
    // Call the default create method
    return super.create(params);
  },
  
  async update(entityId, params) {
    const { data } = params;
    
    // Generate full image URL if FeaturedIMage exists
    if (data.FeaturedIMage && data.FeaturedIMage.length > 0) {
      const imageUrl = data.FeaturedIMage[0].url;
      if (imageUrl) {
        data.featured_image_url = `https://supabasestrapi.onrender.com${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
      }
    } else if (data.FeaturedIMage === null) {
      // Handle case where image is removed
      data.featured_image_url = null;
    }
    
    // Call the default update method
    return super.update(entityId, params);
  }
}));