let pagesArray;

const handlePagination = (pageNumber) => {
  if (!pagesArray) return;

  pagesArray.forEach((page) => {
    page.style.visibility = "hidden";
    page.style.display = "none";
  });

  if (pageNumber > 0 && pageNumber <= pagesArray.length) {
    const page = pagesArray[pageNumber - 1];
    page.style.visibility = "visible";
    page.style.display = "block";
  }
};

class PagedHandler extends Paged.Handler {
	constructor(chunker, polisher, caller) {
		super(chunker, polisher, caller);
	}

	afterPreview(pages) {
		pagesArray = document.querySelectorAll(".pagedjs_page");

		parent.postMessage(
      {
        source: "carerro-frame",
        data: {
          event: "rendered",
          page_count: pagesArray.length,
          width: pagesArray[0].offsetWidth,
          height: pagesArray[0].offsetHeight,
        },
      },
      "*",
    );
		handlePagination(1);
	}
}
Paged.registerHandlers(PagedHandler);

window.addEventListener("message", (event) => {
  const { source, data } = event.data;
  if (source !== "carerro-canvas") return;
  switch (data.event) {
    case "pagination":
      handlePagination(data.page);
      break;
    default:
      break;
  }
});
