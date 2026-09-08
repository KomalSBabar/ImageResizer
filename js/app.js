    let selectedFiles = [];

    function previewImages(event) {
      selectedFiles = Array.from(event.target.files);
      renderPreview();
    }

    function renderPreview() {
      const previewContainer = document.getElementById('previewContainer');
      previewContainer.innerHTML = '';
      if (selectedFiles.length > 0) {
        previewContainer.style.display = 'block';
      } else {
        previewContainer.style.display = 'none';
        return;
      }
      selectedFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const wrapper = document.createElement('div');
          wrapper.className = 'preview-item';
          wrapper.innerHTML = `
            <button class="remove-btn" onclick="removeImage(${index})">×</button>
            <img src="${e.target.result}" alt="preview">
          `;
          previewContainer.appendChild(wrapper);
        }
        reader.readAsDataURL(file);
      });
    }

    function removeImage(index) {
      selectedFiles.splice(index, 1);
      renderPreview();
    }

    async function resizeAndDownloadAll() {
      showLoader();
      try{
            const width = parseInt(document.getElementById('widthInput').value);
            const height = parseInt(document.getElementById('heightInput').value);
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            const format = document.querySelector('input[name="format"]:checked').value;
            const fitType = document.querySelector('input[name="fit"]:checked').value;

            if (!selectedFiles.length) return alert("Please upload at least one image!");
            // if (!width || !height) return alert("Please enter width and height!");
            const shouldResize = width > 0 && height > 0;
            const zip = new JSZip();

            for (let file of selectedFiles) {
                let imageFile = file;
                if (document.getElementById("removeBg").checked) {
                    imageFile = await removeBackgroundImage(file);
                }
                const dataUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = e => resolve(e.target.result);
                reader.readAsDataURL(imageFile);
                });

                const img = await new Promise((resolve) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.src = dataUrl;
                });

                    let sx = 0;
                    let sy = 0;
                    let sWidth = img.width;
                    let sHeight = img.height;
                    let dx = 0;
                    let dy = 0;
                    let dWidth = img.width;
                    let dHeight = img.height;

                if (shouldResize) {
                    canvas.width = width;
                    canvas.height = height;
                    ctx.clearRect(0, 0, width, height);
                    ctx.fillStyle = "white";
                    ctx.fillRect(0, 0, width, height);
                    dWidth = width;
                    dHeight = height;

                    if (fitType === "contain") {
                        const scale = Math.min(width / img.width, height / img.height);
                        dWidth = img.width * scale;
                        dHeight = img.height * scale;
                        dx = (width - dWidth) / 2;
                        dy = (height - dHeight) / 2;
                    } else if (fitType === "cover") {
                        const scale = Math.max(width / img.width, height / img.height);
                        sWidth = width / scale;
                        sHeight = height / scale;
                        sx = (img.width - sWidth) / 2;
                        sy = (img.height - sHeight) / 2;
                    }

                    ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);


                } else {
                    canvas.width = img.width;
                    canvas.height = img.height;

                    ctx.drawImage(img, 0, 0);
                }

                const mimeType = `image/${format}`;
                const resizedData = canvas.toDataURL(mimeType, 0.9);
                const base64Data = resizedData.split(',')[1];

                zip.file(file.name.replace(/\.[^/.]+$/, "") + `_resized.${format}`, base64ToBlob(base64Data, mimeType), { binary: true });
            }

            zip.generateAsync({ type: "blob" }).then(content => saveAs(content, "resized_images.zip"));

            
        } catch(err) {

            console.error(err);
            alert("Something went wrong");

        } finally {

            hideLoader();

        }
      
    }

    function base64ToBlob(base64, mimeType) {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      return new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
    }

    // light and dark mode start
    const btn = document.getElementById("themeToggle");

    btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    btn.textContent =
        document.body.classList.contains("dark-mode")
        ? "☀️"
        : "🌙";
    });

    // light and dark mode end

    function showLoader() {
        document.getElementById("loaderOverlay").style.display = "flex";
    }

    function hideLoader() {
        document.getElementById("loaderOverlay").style.display = "none";
    }


    
 

 
