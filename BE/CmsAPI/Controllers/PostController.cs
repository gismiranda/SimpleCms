using CmsAPI.Data;
using CmsAPI.Models;
using CmsAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CmsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : Controller
    {
        private readonly PostService _postService;
        private readonly ILogger<PostController> _logger;

        public PostController(PostService postService, ILogger<PostController> logger)
        {
            _postService = postService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> SavePost(Post post)
        {
            if (post == null)
            {
                return BadRequest(new { success = false, message = "Post cannot be null" });
            }

            try 
            {
                await using var transaction = await _postService.BeginTransactionAsync();
                var newPost = await _postService.SavePost(post);
                await transaction.CommitAsync();
                return Ok(new { success = true, message = "Post created successfully", postId = newPost.id });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while saving post");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(int id)
        {
            try
            {
                var post = await _postService.GetPostById(id);
                if (post == null)
                {
                    return NotFound(new { success = false, message = "Post not found" });
                }

                return Ok(post);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving post");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] Post updatedPost)
        {
            if (updatedPost == null)
            {
                return BadRequest(new { success = false, message = "Updated post cannot be null" });
            }

            try
            {
                var post = await _postService.UpdatePost(id, updatedPost);
                if (post == null)
                {
                    return NotFound(new { success = false, message = "Post not found" });
                }

                return Ok(new { success = true, message = "Post updated successfully", postId = post.id });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating post");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllPosts()
        {
            try
            {
                var posts = await _postService.GetAllPostsAsync();
                return Ok(posts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving all posts");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpGet("latest")]
        public async Task<IActionResult> GetNewestPosts([FromQuery] int count = 10)
        {
            try
            {
                var posts = await _postService.GetNewestPostsAsync(count);
                return Ok(posts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving the newest posts");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemovePost(int id)
        {
            try
            {
                var result = await _postService.RemovePostAsync(id);
                if (!result)
                {
                    return NotFound(new { success = false, message = "Post not found" });
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while removing post");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }
    }
}
