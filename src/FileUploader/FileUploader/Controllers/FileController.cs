using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace FileUploader.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileController : ControllerBase
    {
        private readonly string fileFolder;

        public FileController(IConfiguration configuration)
        {
            fileFolder = configuration["UploadFolderPath"];
        }


        [HttpGet("")]
        public async Task<IActionResult> GetAllFile()
        {
            DirectoryInfo d = new DirectoryInfo(fileFolder);

            FileInfo[] files = d.GetFiles();
            return Ok(files.Select(x => x.Name));
        }

        [HttpGet("download")]
        public async Task<IActionResult> DownloadFile([FromQuery] string filename)
        {
            var filePath = Path.Combine(fileFolder, filename);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            FileStream fsSource = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            new FileExtensionContentTypeProvider().TryGetContentType(filename, out var contentType);
            fsSource.Position = 0;
            fsSource.Flush();

            Response.Headers.Add("Content-Disposition", "attachment; filename=" + filename);
            return new FileStreamResult(fsSource, contentType ?? "text/plain");
        }

        [HttpPost("create")]
        public async Task<IActionResult> UploadFileAsync(List<IFormFile> files)
        {
            if (!files.Any())
            {
                return NoContent();
            }
            var file = files.First();
            if (file.Length > 0)
            {
                var filePath = Path.Combine(fileFolder, file.FileName);

                using var stream = System.IO.File.Create(filePath);
                await file.CopyToAsync(stream);
            }
            return NoContent();
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteFileAsync([FromQuery] string filename)
        {
            var filePath = Path.Combine(fileFolder, filename);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            FileInfo file = new FileInfo(filePath);
            file.Delete();

            return NoContent();
        }
    }
}