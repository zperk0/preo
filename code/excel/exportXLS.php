<?php
/**
 * PHPExcel
 *
 * Copyright (c) 2006 - 2015 PHPExcel
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 *
 * @category   PHPExcel
 * @package    PHPExcel
 * @copyright  Copyright (c) 2006 - 2015 PHPExcel (http://www.codeplex.com/PHPExcel)
 * @license    http://www.gnu.org/licenses/old-licenses/lgpl-2.1.txt	LGPL
 * @version    ##VERSION##, ##DATE##
 */

/** Error reporting */
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('Europe/London');

define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

/** Include PHPExcel */
require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

// Create new PHPExcel object
$objPHPExcel = new PHPExcel();

$styleArray = array(
	  'borders' => array(
            'allborders' => array('style' => PHPExcel_Style_Border::BORDER_THIN,
                   'color' => array('rgb' => PHPExcel_Style_Color::COLOR_WHITE)
                )
            )
	);

// Remove all border (color white)
$objPHPExcel->getActiveSheet()->getStyle('A1:Z100')->applyFromArray($styleArray);

$titles = array('A2', 'B2', 'D2', 'E2', 'G2', 'H2', 'J2', 'K2', 'M2', 'N2', 'A6', 'B6', 'D6', 'E6', 'G6', 'H6');
$values = array('A3', 'B3', 'D3', 'E3', 'G3', 'H3', 'J3', 'K3', 'M3', 'N3', 'A7', 'B7', 'D7', 'E7', 'G7', 'H7');

// Promotion titles
$objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A2', 'PROMOTION')
            ->setCellValue('D2', 'CLIENT')
            ->setCellValue('G2', 'DATE')
            ->setCellValue('J2', 'TIME')
            ->setCellValue('M2', 'GUESTS');

// data from post
$post = json_decode($_POST['data'])->data;

$objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A3', $post->booking->promotion)
            ->setCellValue('D3', $post->client->name)
            ->setCellValue('G3', $post->booking->date)
            ->setCellValue('J3', $post->booking->time)
            ->setCellValue('M3', $post->booking->guests);

// merging title cells
$objPHPExcel->getActiveSheet()->mergeCells('A2:B2');
$objPHPExcel->getActiveSheet()->mergeCells('A3:B3');
$objPHPExcel->getActiveSheet()->mergeCells('D2:E2');
$objPHPExcel->getActiveSheet()->mergeCells('D3:E3');
$objPHPExcel->getActiveSheet()->mergeCells('G2:H2');
$objPHPExcel->getActiveSheet()->mergeCells('G3:H3');
$objPHPExcel->getActiveSheet()->mergeCells('J2:K2');
$objPHPExcel->getActiveSheet()->mergeCells('J3:K3');
$objPHPExcel->getActiveSheet()->mergeCells('M2:N2');
$objPHPExcel->getActiveSheet()->mergeCells('M3:N3');

$objPHPExcel->getActiveSheet()->mergeCells('A6:B6');
$objPHPExcel->getActiveSheet()->mergeCells('A7:B7');
$objPHPExcel->getActiveSheet()->mergeCells('D6:E6');
$objPHPExcel->getActiveSheet()->mergeCells('D7:E7');
$objPHPExcel->getActiveSheet()->mergeCells('G6:H6');
$objPHPExcel->getActiveSheet()->mergeCells('G7:H7');

// client contact
$objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A6', 'CLIENT CONTACT')
            ->setCellValue('D6', 'CONTACT NO.')
            ->setCellValue('G6', 'CONTACT EMAIL');

$objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A7', $post->client->name)
            ->setCellValue('D7', $post->client->phone)
            ->setCellValue('G7', $post->client->email);


for ($i = 0; $i < count($titles); $i++) {
	setStyles($titles[$i], $objPHPExcel);
}

for ($i = 0; $i < count($values); $i++) {
    formatBorders($values[$i], $objPHPExcel);
}

$sections = $post->sections;
$column = 0;

// format sections
foreach ($sections as $section) {

	$totalModifiers = 0;
	$cellSName = PHPExcel_Cell::stringFromColumnIndex($column).'10';
	$cellSQty = PHPExcel_Cell::stringFromColumnIndex($column + 1).'10';

	$objPHPExcel->getActiveSheet()->getStyle($cellSName)->getFont()->setBold(true);
	$objPHPExcel->getActiveSheet()->getStyle($cellSQty)->getFont()->setBold(true);
	setStyles($cellSName, $objPHPExcel);
	setStyles($cellSQty, $objPHPExcel);
	$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($column, 10, $section->sectionName);
	$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($column + 1, 10, $section->total);

	foreach($section->items as $row => $item) {

		$cellIName = PHPExcel_Cell::stringFromColumnIndex($column).($row + 11 + $totalModifiers);
		$cellIQty = PHPExcel_Cell::stringFromColumnIndex($column + 1).($row + 11 + $totalModifiers);

        $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($column, $row + 11 + $totalModifiers, $item->name);
        $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($column + 1, $row + 11 + $totalModifiers, $item->qty);
        formatBorders($cellIName, $objPHPExcel);
        formatBorders($cellIQty, $objPHPExcel);

        foreach($item->modifiers as $rowMod => $itemMod) {

        	$cellMName = PHPExcel_Cell::stringFromColumnIndex($column).($row + $rowMod + 12);
			$cellMQty = PHPExcel_Cell::stringFromColumnIndex($column + 1).($row + $rowMod  + 12);

	        $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($column, $row + $rowMod + 12, $itemMod->name);
	        $objPHPExcel->getActiveSheet()->getStyle($cellMName)->getFont()->setSize(9);
	        $objPHPExcel->getActiveSheet()->getStyle($cellMName)->getFont()->setItalic(true);
	        $objPHPExcel->getActiveSheet()->getStyle($cellMName)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
	        formatBorders($cellMName, $objPHPExcel);
	        formatBorders($cellMQty, $objPHPExcel);
			$totalModifiers++;
        }
	}

	$column += 3;
}

// Rename worksheet
$objPHPExcel->getActiveSheet()->setTitle('Booking');

// title style with background color
function setStyles($cell, $objExcel) {

	$objExcel->getActiveSheet()->getStyle($cell)->getFont()->setBold(true);

	$objExcel->getActiveSheet()->getStyle($cell)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
    $objExcel->getActiveSheet()->getStyle($cell)->getFill()->getStartColor()->setRGB('d9d9d9');

    formatBorders($cell, $objExcel);
}

function formatBorders($cell, $objExcel) {

	$styleArray = array(
		  'borders' => array(
		      'allborders' => array(
		          'style' => PHPExcel_Style_Border::BORDER_THIN,
	              'color' => array('argb' => '00000000')
		      )
		  )
		);

	$objExcel->getActiveSheet()->getStyle($cell)->applyFromArray($styleArray);
}

// Set active sheet index to the first sheet, so Excel opens this as the first sheet
$objPHPExcel->setActiveSheetIndex(0);


// Redirect output to a client’s web browser (Excel5)
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="Booking.xls"');
header('Cache-Control: max-age=0');
// If you're serving to IE 9, then the following may be needed
header('Cache-Control: max-age=1');

// If you're serving to IE over SSL, then the following may be needed
header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
header ('Pragma: public'); // HTTP/1.0

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
$objWriter->save('php://output');
exit;