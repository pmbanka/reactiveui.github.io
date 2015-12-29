(function($) {
	"use strict";

	var $form = $("#script_options"),
		$output = $("#script_output");
	$form.find("input:checkbox").click(generateScript);
	$form.find("input:text").keyup(generateScript);

	function generateScript() {
		var include = ["\"Autofac\""];
		$("#application_type,#library_integration,#additional_features").find("input:checkbox:checked").each(function() {
			include.push("\"" + $(this).val() + "\"");
		});
		var script = "$aps=" + include.join() + ";foreach($ap in $aps){Install-Package $ap";
		var projectName = $("#project_name").val().trim();
		if (projectName) {
			script += " -ProjectName " + projectName;
		}
		if ($("#include_prerelease").is(":checked")) {
			script += " -IncludePrerelease";
		}
		script += ";}Remove-Variable -Name \"ap\",\"aps\";";
		$output.text(script);
	}

	function selectScript() {
		var range,
		id = "script_output";
		if (document.selection) {
			range = document.body.createTextRange();
			range.moveToElementText(id);
			range.select();
		} else if (window.getSelection) {
			range = document.createRange();
			range.selectNode(document.getElementById(id));
			window.getSelection().addRange(range);
		}
	}

	generateScript();
	if (document.selection || window.getSelection) {
		$("#select_all").click(selectScript);
	} else {
		$("#select_all").hide();
	}
}(jQuery));