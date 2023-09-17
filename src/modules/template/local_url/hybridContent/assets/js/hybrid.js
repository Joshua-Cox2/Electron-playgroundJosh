let animationConfig = {
    fps: 24,
    delay: 1000/this.fps,
    nextTime: 0,
    isAnimating: true
};

let state = {
    page: {
        width: Number(0),
        height: Number(0)
    },
    canvas: new fabric.Canvas('canvas'),
    canvasConfig: null,
    zoomLvl: Number(1),
    videoIds: Array()
};

let firstRender = true;

const startAnimating = () => {
    animationConfig.isAnimating = true;
};

const stopAnimating = () => {
    animationConfig.isAnimating = false;
};

const bubbleError = () => {
    parent.window.postMessage("hybridFailed", "*");
};

const playReady = () => {
    parent.window.postMessage("hybridPlay", '*');
};

const makeRequest = (options) => {
    if (!options.method) {
        options.method = 'POST';
    }
    if (!options.url) {
        options.url = '';
    }
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(options.method, options.url);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = () => {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        if (options.headers) {
            Object.keys(options.headers).forEach((key) => {
                xhr.sendRequestHeader(key, options.headers[key]);
            });
        }
        let params = options.params;
        if (params && typeof params === 'object') {
            if (options.method === 'GET' || options.method === 'get') {
                params = Object.keys(params).map((key) => {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                });
            } else {
                params = JSON.stringify(params);
            }
        }
        xhr.send(params);
    });
};

const getAdvertNextData = () => {
    let data = {
        advert: null,
        error: Boolean(false),
        errorMsg: String('🔥')
    };
    if (window.parent == window.top) {
        data.error = true;
        data.errorMsg = '🔥🔥🔥 Unable to retrieve the parent information';
    } else {
        data.advert = null;
        if (window.frameElement.classList.contains('hybrid')) {
            let found  = false;
            for (let i = 0; i < clientData.data.length && !found; i++ ) {
                console.log('clientData.data[i]', clientData.data[i]);
                if (clientData.data[i].adverts_id === window.frameElement.id) {
                    data.advert = clientData.data[i];
                    found = true;
                }
            }
        } else {
            data.error = true;
            data.errorMsg = '💢💢💢 advert is not a hybrid 💢💢💢';
        }

        if (data.advert == null) {
            data.error = true;
            data.errorMsg = '💢💢💢 advert details not located 💢💢💢';
        }
    }
    return data;
};

const addFontsUsed = () => {
    state.canvasConfig.fontsUsed.forEach((font) => {
        font.url = font.url.replace('/assets/fonts/editorFonts/', 'assets/fonts/');
        let css = document.createElement('style');
        css.type = 'text/css';
        css.innerHTML = "@font-face { font-family: '" + font.name + "'; src: url('" + font.url + "') format('truetype');}";
        document.body.appendChild(css);
        let myfont = new FontFaceObserver(font.name);
        myfont.load().then(function () {
            state.canvas.requestRenderAll();
        }).catch(function (e) {
            console.error('🔥🔥🔥Failed to load font: ' + font.name);
            console.error('🔥🔥🔥', e);
        });
    });
};

const generateCanvas = (conf) => {
    state.canvasConfig = conf.json.canvasConfig;
    addFontsUsed();
    
    state.canvas.setWidth(state.canvasConfig.cWidth);
    state.canvas.setHeight(state.canvasConfig.cHeight);
    state.canvas.loadFromJSON(conf.json.canvas);
    state.canvas.renderAll();
    // contain to body
    
    setTimeout(() => {
        if (state.canvasConfig.cWidth > state.page.width || state.canvasConfig.cHeight > state.page.height) {
            while ((state.canvasConfig.cWidth * state.zoomLvl) > state.page.width || (state.canvasConfig.cHeight * state.zoomLvl) > state.page.height) {
                state.zoomLvl -= 0.001;
            }
        } else if (state.canvasConfig.cWidth < state.page.width && state.canvasConfig.cHeight < state.page.height) {
            let filled = false;
            tmpZoom = scope.zoomLvl;
            while (!filled) {
                tmpZoom += 0.001;
                if ((state.canvasConfig.cWidth * tmpZoom) < state.page.width && (state.canvasConfig.cHeight * tmpZoom) < state.page.height) {
                    scope.zoomLvl += 0.001;
                } else {
                    filled = true;
                }
            }
        }
        let lastId = state.canvas._objects[state.canvas._objects.length - 1].id;
        state.canvas._objects.forEach((obj, index) => {
            if (obj.customType === 'video') {
                let file = obj.fileName;
                file = file.replace('.mp4', '.webm');
                let path = '';
                let found = false;
                let ob = null;
                let locIndex = -1;
                conf.adverts.forEach((obj2, index2) => {
                    if (index === obj2.index && obj.fileName === obj2.fileName && !found) {
                        path = obj2.path;
                        ob = obj2;
                        locIndex = index2;
                        found = true;
                    }
                });
                if (found) {
                    try {
                        ob.orig = state.canvas._objects[ob.index];
                        ob.orig.visible = false;
                        let video = document.createElement('video');
                        video.id = obj.class + "CANVAS";
                        video.crossOrigin = "anonymous";
                        video.loop = true;
                        video.preload = true;
                        video.playsinline = true;
                        video.muted = "muted";
                        let source = document.createElement('source');
                        source.src = path + file;
                        source.type = 'video/webm';
                        video.appendChild(source);
                        let width = ob.orig.width * ob.orig.scaleX;
                        width *= state.canvas.getZoom();
                        let height = ob.orig.height * ob.orig.scaleY;
                        height *= state.canvas.getZoom();
                        $(video).attr('widthResize',width);
                        $(video).attr('heightResize', height);
                        video.width = state.page.width;
                        video.height = state.page.height;
                        video.style.marginTop = '16px';
                        video.style.display = 'none';
                        document.body.appendChild(video);
                        video.load();
                        lastId++;
                        let videoE = document.getElementById(video.id);
                        let video1 = new fabric.Image(videoE, {
                            left: ob.orig.left,
                            top: ob.orig.top,
                            angle: ob.orig.angle,
                            originX: ob.orig.originX,
                            originY: ob.orig.originY,
                            id: lastId,
                            class: ob.orig.class + "CANVAS",
                            type: 'image',
                            customType: 'video',
                            zIndex: lastId,
                            scaleX: 1,
                            scaleY: 1,
                            fileName: ob.orig.fileName,
                            objectCaching: false
                        });
                        state.canvas.add(video1);
                    } catch (err) {
                        console.error('🔥🔥🔥 ', err);
                        bubbleError();
                    }
                } else {
                    // error
                    // either display as static image or skip advert
                    bubbleError();
                }
            }
        });
        // loop through and swap matching layers
        let pairs = Array();
        state.canvas._objects.forEach((item, idx) => {
            if (item.type === "image" && item.customType === "video" && item.class.endsWith('CANVAS')) {
                let found = false;
                state.canvas._objects.forEach((item2, idx2) => {
                    if (item.customType === item2.customType && (item.class === item2.class + "CANVAS")) {
                        if (!found) {
                            pairs.push({
                                videoIdx: idx,
                                placeholderIdx: idx2
                            });
                            found = true;
                        }
                    }
                });
                if (!found) {
                    console.error('🔥🔥🔥 Unable to find a matching place holder for a video', idx);
                    bubbleError();
                }
            }
        });
        pairs.forEach((pair) => {
            let tmp = state.canvas._objects[pair.placeholderIdx];
            state.canvas._objects[pair.placeholderIdx] = state.canvas._objects[pair.videoIdx];
            state.canvas._objects[pair.videoIdx] = tmp;

        });
        state.canvas._objects.forEach((itm) => {
            if (itm.customType === 'video' && itm.class.endsWith('CANVAS')) {
                let vid = $('#' + itm.getElement().id);
                itm.scaleToHeight(vid.attr('heightresize'));
                itm.scaleToWidth(vid.attr('widthresize'));
            }
        });
        state.canvas.setZoom(state.zoomLvl);
        state.canvas.setHeight(state.canvasConfig.cHeight * state.canvas.getZoom());
        state.canvas.setWidth(state.canvasConfig.cWidth * state.canvas.getZoom());
        fabric.util.requestAnimFrame(render = (time) => {
            if (!animationConfig.isAnimating || time < animationConfig.nextTime) {
                fabric.util.requestAnimFrame(render);
                return;
            }
            animationConfig.nextTime = time + animationConfig.delay;
            state.canvas.renderAll();
            if (firstRender) {
                playReady();
                firstRender = false;
            }
            fabric.util.requestAnimFrame(render);
        });
        state.canvas.renderAll();
        
    }, 500);
};

const getAdvertDetails = (advertId, imageEditId) => {
    var data = {
        json: null,
        jsonOrig: null,
        fileName: String(''),
        adverts: Array(),
        path: String(''),
        error: Boolean(false),
        errorMsg: String('🔥')
    };
    // build path and store it
    data.fileName = imageEditId + advertId + '.json';
    data.path = window.location.href.replace('index1.html', '').replace('index.html', '').replace('local_url/hybridContent/', '');
    data.path += 'content/hybrid/';
    // check to see if json exists at the provided path
    makeRequest({
        method: 'GET',
        url: data.path + data.fileName
    }).then((response) => {
        data.json = JSON.parse(response);
        data.jsonOrig = response;
        
        if ((typeof data.json.canvas !== 'undefined') && (typeof data.json.canvasConfig !== 'undefined')) {
            data.json.canvas = JSON.parse(data.json.canvas);
            // if video check to see if the physical file published otherwise ifi it is an image use the src that is on the object already
            data.json.canvas.objects.forEach((item, index) => {
                if (!data.error) {
                    if (item.customType === "video") {
                        console.info('💩 Video Item', item);
                        let record = {
                            index: index,
                            orig: item,
                            fileName: String(''),
                            path: String(''),
                            error: Boolean(false),
                            errorMsg: String('🔥')
                        };
                        record.fileName = item.fileName;
                        record.path = window.location.href.replace('index1.html', '').replace('index.html', '').replace('local_url/hybridContent/', '');
                        record.path += 'content/videos/';

                        if (record.error) {
                            console.error(record.errorMsg);
                            data.error = record.error;
                        }
                        data.adverts.push(record);
                    }
                }
            });
            if (!data.error) {
                generateCanvas(data);
            }
        } else {
            console.error('🔥🔥🔥💢💢💢 Hybrid JSON is not of the correct format 💢💢💢🔥🔥🔥');
            bubbleError();
        }
    }).catch((err) => {
        if ((typeof err.status !== 'undefined') && (typeof err.statusText !== 'undefined')) {
            console.error('🔥🔥🔥 Error encountered when retrieving the Fabric JSON!');
            console.error('💢💢💢 ' + data.path + data.fileName + " 🔥🔥🔥 " + err.status + " - " + err.statusText);
            console.warn('⚠️⚠️⚠️ Not loading Hybrid Conetn due to being unable to find the JSON ⚠️⚠️⚠️');
            bubbleError();
        }
    });
};

const main = () => {
    state.page.width = clientData.screen.screen_width;
    state.page.height = clientData.screen.screen_height;
    let advertParent = getAdvertNextData();
    let error = advertParent.error;
    let errorMsg = advertParent.errorMsg;
    if (error) {
        console.error(errorMsg);
        bubbleError();
    } else {
        let advertId = advertParent.advert.adverts_id;
        let imageEditId = advertParent.advert.adverts_image_edits_id;
        getAdvertDetails(advertId, imageEditId);
    }
};
main();