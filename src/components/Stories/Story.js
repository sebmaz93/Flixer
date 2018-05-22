import React from "react";

import "./Story.css";

const Story = ({ viewStory, story }) => (
	<li styleName="item" onClick={() => viewStory(story)}>
		<div styleName={!!story.seen ? "outerSeen" : "outer"}>
			<div styleName="logo">
				<img
					src={story.previewImage}
					alt=""
					styleName={!!story.seen ? "grayScale" : ""}
				/>
			</div>
		</div>
	</li>
);
export default Story;
