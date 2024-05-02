$(document).ready(function () {
	var isHovered = false;

	// Array of country data
	var countryData = {
		Sudan: {
			details: [
				{
					Recipient: "World Bank & Ministry of General Education and Instruction (MoGEI)",
					Topic_Area: "Structured Pedagogy (Teacher Training)",
					Description:
						"Provide technical insight and guidance throughout the development of the solicitation for a new project at-scale focused on teacher training. Advise on structured pedagogy materials development and alignment (with the new CBC curriculum). Work with the MoGEI to think through materials, strategize on how the MoGEI will deliver these materials over time, and identify the implications for the system (i.e., system support for both personnel—ministry central staff, to district level to tutors—and non-personnel).",
					TA_provider: "External Consultants",
				},
			],
		},
		Kenya: {
			details: [
				{
					Recipient: "Grassroots Nest for Innovation and Change (GRIC)",
					Topic_Area: "Structured Pedagogy (Materials Development) & Remediation",
					Description:
						"Conduct a materials development workshop and guide in the development of materials for GRIC’s partner organizations.",
					TA_provider: "External Consultants",
				},
				{
					Recipient: "ZiziAfrique",
					Topic_Area: "Pre-service Teacher Training",
					Description:
						"Support local ZiziAfrique staff to conduct a landscape analysis of pre-service teacher training institutions and their capacity in Kenya.",
					TA_provider: "External Consultants",
				},
			],
		},
		Uganda: {
			details: [
				{
					Recipient: "STiR Education",
					Topic_Area: "Assessment-informed Instruction",
					Description:
						"Support adaptation of SoT resources for a series of learning improvement cycles, focused on assessment-informed instruction, for Ugandan teachers across 79 districts and 34 municipalities (over half the national total). Provide funding to STiR to conduct research into how SoT resources can inform the organization’s “learning improvement cycles” model at scale. SoT is also coaching STiR through the research design of this study.",
					TA_provider: "Better Purpose and External Consultant",
				},
			],
		},
		Tanzania: {
			details: [
				{
					Recipient: "Ministry of Education and Vocational Training ",
					Topic_Area: "Pre-service Teacher Training",
					Description:
						"Review pre-service teacher education (PSTE) curriculum against the new competency-based curriculum to identify linkages and gaps.  Support provision of a capacity-building workshop for ministry staff in the Teacher Training Department, curriculum developers, and lecturers at pre-service institutes to share learnings and identify areas for development.",
					TA_provider: "External Consultant",
				},
			],
		},
		Rwanda: {
			details: [
				{
					Recipient: "World Bank & Ministry of Education ",
					Topic_Area: "Numeracy",
					Description:
						"Rwanda Ministry of Education: Provide light-touch review of the math student textbook, focusing on the support for English-language students provided in the books and design/formatting elements. World Bank: Share feedback outlining what should be considered in the short, medium, and longer term. ",
					TA_provider: "SoT staff",
				},
			],
		},
		Malawi: {
			details: [
				{
					Recipient: "FCDO & Cambridge Education",
					Topic_Area: "Numeracy",
					Description: "Review and provide feedback on grade 1 and 2 math textbooks.",
					TA_provider: "External Consultant",
				},
			],
		},
		"Sierra Leone": {
			details: [
				{
					Recipient: "Bridges Outcomes Partnership (BOP)",
					Topic_Area: "Structured Pedagogy (On-going Teacher Support)",
					Description:
						"Provide supports to three of BOP’s grantees (EducAid, Street Child, and Rising Academies) by observing and understanding these programs’ theories of change and implementation to course correct and improve learning outcomes.",
					TA_provider: "Partner Organization",
				},
				{
					Recipient: "FAB Inc.",
					Topic_Area: "All Topics",
					Description:
						"Provide subject matter expertise in foundational literacy and numeracy to FabInc’s Generative AI software for teachers specifically regarding how best to structure the information given to Large Language Models (LLMs) —which support the AI software— to ensure the outputs from LLM’s are high quality and accurate. The LLM pulls from SoT materials and other relevant literature. ",
					TA_provider: "External Consultants",
				},
				{
					Recipient: "Ministry of Basic and Senior Secondary Education",
					Topic_Area: "Structured Pedagogy (Government Leadership, Education Leaders Knowledge)",
					Description:
						"Provide provision of technical support to the Ministry Delivery Team to build institutional capacity at the various levels of the primary education system to effectively implement and manage improved instruction in the early grades.",
					TA_provider: "External Consultants",
				},
			],
		},
		Gambia: {
			details: [
				{
					Recipient: "World Bank",
					Topic_Area: "Language of Instruction & Structured Pedagogy (All Sub-components)",
					Description:
						"Support different areas of the Gambia’s foundational learning reform, including language of instruction (policy development and language mapping to inform teacher deployment). Design of a new structured pedagogy program (i.e., scaling up the Effective Interventions FLN pilot). Provide a curriculum quality assurance review.",
					TA_provider: "Partner Organization & External Consultants",
				},
			],
		},
		// Add data for other countries similarly
	};

	// Show popup on country hover
	$("path.active").hover(
		function (event) {
			isHovered = true;
			var countryID = $(this).attr("id");
			var countryName = $(this).data("name");
			var countryInfo = countryData[countryName].details;

			// Set the title dynamically
			$("#country-title").text(`${countryName} (${countryID})`);

			// Loop through the data array
			countryInfo.forEach(function (item) {
				// Create a new row
				var row = $("<tr>");

				// Append table data (columns) to the row
				row.append($("<td>").text(item.Recipient));
				row.append($("<td>").text(item.Topic_Area));
				row.append($("<td>").text(item.Description));
				row.append($("<td>").text(item.TA_provider));

				// Append the row to the table body
				$("#country-table tbody").append(row);
			});

			// Position the popup just next to the mouse icon
			var mouseX = event.pageX;
			var mouseY = event.pageY;
			positionPopup(mouseX, mouseY);
		},
		function () {
			isHovered = false;
			// Clear table data
			$("#country-table tbody").empty();
			$("#popup").css("display", "none");
		}
	);

	// Move popup with mouse movement within the selected country
	$(".map-container").mousemove(function (event) {
		if (isHovered) {
			var mouseX = event.pageX;
			var mouseY = event.pageY;
			positionPopup(mouseX, mouseY);
		}
	});

	// Function to position the popup
	function positionPopup(mouseX, mouseY) {
		var popupWidth = $("#popup").outerWidth();
		var popupHeight = $("#popup").outerHeight();
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var posX = mouseX + 10; // Add some offset from mouse
		var posY = mouseY - popupHeight - 10; // Adjust position to be above the mouse

		// Check if popup overflows on the right
		if (posX + popupWidth > windowWidth) {
			posX = mouseX - popupWidth - 10; // Adjust to fit within window width
		}

		// Check if popup overflows at the bottom
		if (posY + popupHeight > windowHeight) {
			posY = mouseY - popupHeight - 10; // Adjust to fit within window height
		}

		// Check if popup overflows at the top
		if (posY < 0) {
			posY = mouseY + 1; // Show below the mouse if it overflows at the top
		}

		// Set popup position
		$("#popup").css({
			top: posY,
			left: posX,
		});

		// Show popup
		$("#popup").css("display", "block");
	}

	// Hide popup when mouse leaves map container
	$(".map-container").mouseleave(function () {
		isHovered = false;
		$("#country-table tbody").empty();
		$("#popup").css("display", "none");
	});
});
