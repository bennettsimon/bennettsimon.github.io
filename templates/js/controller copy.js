const handlePagination = (pageNumber) => {
	document.querySelectorAll(".pagedjs_page").forEach((page) => {
		page.style.position = "absolute";
		page.style.visibility = "hidden";
	});

	const visiblePage = document.querySelector(
		`.pagedjs_page[data-page-number="${pageNumber}"]`
	);
	if (visiblePage) {
		visiblePage.style.position = "relative";
		visiblePage.style.visibility = "visible";
	} else {
		console.error("Specified page does not exist.");
	}
};

class PagedHandler extends Paged.Handler {
	constructor(chunker, polisher, caller) {
		super(chunker, polisher, caller);
	}

	afterPreview(pages) {

		document.body.style.visibility = 'visible';
		parent.postMessage(
			{
				source: "carerro-frame",
				data: {
					event: "rendered",
					page_count: pages.length,
					width: document.documentElement.scrollWidth,
					height: document.documentElement.scrollHeight
				},
			},
			"*"
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
