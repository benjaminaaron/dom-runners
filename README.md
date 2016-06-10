# dom-runners
a simple pedestrian crowd simulation where agents run across a website

## Usage

When running locally, the same-origin policy doesn't allow _html2canvas_ to read images into the canvas. Well, with `allowTaint: true` he would do it, but then `getImageData()` wouldn't be allowed to read the pixels from the canvas because it's "tainted". The workaround is to start a python server (`python -m SimpleHTTPServer`) in the repo folder and go to `localhost:8000`.