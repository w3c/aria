<!DOCTYPE html>
<html>
	<head>
		<title>Accessible Name Tests</title>
		<style type="text/css">
			table, td, th {
				border: thin solid black;
				border-collapse: collapse;
			}
			tr {
				vertical-align: top;
			}
			th {
				text-align: left;
			}
			th[colspan] {
				text-align: center;
			}
		</style>
	</head>
	<body>
		<?php
require_once "_db_connect.phi";
$sth = $dbh->prepare("select * from test_testcases where testsuite_id in (1,2) and specsection_id in (13,15,16,26,30,40,42);");
$sth2 = $dbh->prepare("select * from test_expectedresults where testsuite_id = :testsuite_id and testcase_id = :testcase_id and platform_id = :platform_id;");
$sth->execute();
$csv = "";
?>
		<table>
			<thead>
				<tr>
					<th rowspan="2">Testable Statement</th>
					<th rowspan="2">Test File Path</th>
					<th colspan="6">Expected Results</th>
				</tr>
				<tr>
					<th>All Platforms</th>
					<th>MSAA + UIA Express</th>
					<th>MSAA + IAccessible2</th>
					<th>UIA</th>
					<th>ATK/AT-SPI</th>
					<th>AXAPI</th>
				</tr>
			</thead>
			<tbody>
				<?php
while ($row = $sth->fetch()) {
	print ("<tr>");
	print ("<td>" . htmlspecialchars($row['testable_statement']) . "</td>"); $csv .= $row['testable_statement'] . ",";
	print ("<td>https://raw.githubusercontent.com/w3c/aria/master/testfiles/1.0/" . $row['testfile_path'] . "</td>"); $csv .= "https://raw.githubusercontent.com/w3c/aria/master/testfiles/1.0/" . $row['testfile_path'] . ",";
	for ($i = 0; $i <= 5; $i++) {
		$sth2->bindValue(":testsuite_id", $row['testsuite_id']);
		$sth2->bindValue(":testcase_id", $row['testcase_id']);
		$sth2->bindValue(":platform_id", $i);
		$sth2->execute();
		$row2 = $sth2->fetch();
		print ("<td>" . htmlspecialchars($row2['expected_result']) . "</td>"); $csv .= $row2['expected_result'] . ",";
	}
	print ("</tr>"); $csv .= "\n";
}
?>
			</tbody>
		</table>
<?php print ($csv); ?>
	</body>
</html>