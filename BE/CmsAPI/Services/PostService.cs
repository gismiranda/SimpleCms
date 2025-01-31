using CmsAPI.Data;
using CmsAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;

namespace CmsAPI.Services
{
    public class PostService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<PostService> _logger;

        public PostService(ApplicationDbContext context, ILogger<PostService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Post> SavePost(Post post)
        {
            if (post == null)
            {
                throw new ArgumentNullException(nameof(post));
            }

            post.tags = JsonConvert.SerializeObject(post.tags);
            _context.posts.Add(post);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Post saved successfully with ID: {PostId}", post.id);
            return post;
        }

        public async Task<Post> GetPostById(int id)
        {
            return await _context.posts.FindAsync(id);
        }

        public async Task<IEnumerable<Post>> GetAllPostsAsync()
        {
            return await _context.posts.ToListAsync();
        }

        public async Task<IEnumerable<Post>> GetNewestPostsAsync(int count = 10)
        {
            return await _context.posts
                .OrderByDescending(p => p.posted_date)
                .Take(count)
                .ToListAsync();
        }

        public async Task<bool> RemovePostAsync(int postId)
        {
            var post = await GetPostById(postId);
            if (post == null)
            {
                _logger.LogWarning("Post with ID: {PostId} not found", postId);
                return false;
            }

            _context.posts.Remove(post);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Post removed successfully with ID: {PostId}", postId);
            return true;
        }

        public async Task<Post> UpdatePost(int id, Post updatedPost)
        {
            if (updatedPost == null)
            {
                throw new ArgumentNullException(nameof(updatedPost));
            }

            var existingPost = await GetPostById(id);
            if (existingPost == null)
            {
                _logger.LogWarning("Post with ID: {PostId} not found", id);
                return null; 
            }

            existingPost.title = updatedPost.title;
            existingPost.content = updatedPost.content;
            existingPost.tags = JsonConvert.SerializeObject(updatedPost.tags);

            _context.posts.Update(existingPost);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Post updated successfully with ID: {PostId}", existingPost.id);

            return existingPost;
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            return await _context.Database.BeginTransactionAsync();
        }
    }
}
