const metadataConfig = {
    homepage: {
      title: "Homepage - CMS",
      description: "Homepage displaying the 10 most recent blog posts.",
      ogTitle: "Homepage - CMS",
      ogDescription: "Homepage displaying the 10 most recent blog posts."
    },
    createPost: {
      title: "Create Post - CMS",
      description: "Create a new blog post.",
      ogTitle: "Create Post - CMS",
      ogDescription: "Create a new blog post."
    },
    editPost: {
      title: "Edit Post - CMS",
      description: "Edit an existing blog post.",
      ogTitle: "Edit Post - CMS",
      ogDescription: "Edit an existing blog post."
    },
    login: {
      title: "Login - CMS",
      description: "Login to access the CMS.",
      ogTitle: "Login - CMS",
      ogDescription: "Login to access the CMS."
    },
    postDetail: (post) => ({
      title: `${post.title} - CMS`,
      description: post.content.substring(0, 150),
      ogTitle: `${post.title} - CMS`,
      ogDescription: post.content.substring(0, 150)
    })
  };
  
  export default metadataConfig;