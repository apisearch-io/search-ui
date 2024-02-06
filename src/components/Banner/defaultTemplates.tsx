export const defaultBannerTemplate = `
    <div class="banner">
        {{#has_url}}<a href="{{url}}">{{/has_url}}
            <picture>
                <source srcset="{{image_prefix}}{{desktop_img}}" media="(min-width: {{breaking_point_size}}px)" />
                <img src="{{image_prefix}}{{mobile_img}}" loading="lazy" class="soft-lazy" onload="window.asImageShow(this)" />
            </picture>
        {{#has_url}}</a>{{/has_url}}
    </div>
`;
