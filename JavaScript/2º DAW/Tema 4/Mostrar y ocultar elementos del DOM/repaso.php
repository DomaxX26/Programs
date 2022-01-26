<?php
$hores = ["17" => "17:00", "18" => "18:00", "19" => "19:00", "20" => "20:00", "21" => "21:00"];
$nom = '';
// La lògica principal de pàgina: //- Si s'envia el formulari, el valida i el processa o el torna a mostrar si hi ha hagut errors. //- Si no s’ha enviat, el simplement el mostra
?> <h1>Selecció de menú</h1>
<?php if ($_SERVER['REQUEST_METHOD'] === '    ') {
	$errors = validate_form();
	if (count($errors) > 0) {
		show_form($errors);
	} else {
		echo process_form();
	}
} else {
	show_form();
}

function show_form($errors = array())
{
?>
	<form method="POST" action="<?= $_SERVER['PHP_SELF'] ?>">
		<table>
			<tr>
				<td>Nom:</td>
				<td><input name="nom" type="text" /></td>
			</tr>
			<tr>
				<td>Pista:</td>
				<td> <select name="pista">
					</select> </td>
			</tr>
			<tr>
				<td>Data de la reserva:<br /><small>(dd/mm/aaaa)</small></td>
				<td><input name="data" value="" type="text" /></td>
			</tr>
			<tr>
				<td>Hora:</td>
				<td>
				</td>
			</tr>
			<tr>
				<td colspan="2" align="center"> <input value="Reserva" type="submit" /> <input value="Netejar camps" type="reset" /></td>
			</tr>
		</table>
	</form> 
	<?php }

function validate_form(): array {    
	global $nom;
    $errors = [];
    $nom = trim($_POST['nom'] ?? '');

	if (empty($nom)) {        
		$errors[] = 'Per favor indica el teu nom.';    
	}     
	elseif (strlen($nom)>30) {        
		$errors[] = "El nom és massa llarg.";    
	}
}
function process_form(): string {
    return $message; }
?>

