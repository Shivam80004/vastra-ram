export function VideoSlider({ videos }: { videos: any[] }) {
    if (!videos || videos.length === 0) return null;

    return (
        <section className="video-slider-section py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Featured Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video: any, index: number) => {
                        // Assuming GenericFile with url or Video object
                        // 'sources' is typical for Shopify Video object, 'url' for GenericFile
                        const src = video?.sources?.[0]?.url || video?.url;

                        if (!src) return null;

                        return (
                            <div key={video.id || index} className="video-wrapper aspect-video bg-black rounded-lg overflow-hidden">
                                <video
                                    controls
                                    className="w-full h-full object-cover"
                                    poster={video?.previewImage?.url}
                                >
                                    <source src={src} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
