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
$activeSheet = $objPHPExcel->getActiveSheet();

$styleArray = array(
	  'borders' => array(
            'allborders' => array('style' => PHPExcel_Style_Border::BORDER_THIN,
                   'color' => array('rgb' => PHPExcel_Style_Color::COLOR_WHITE)
                )
            )
	);

$styleAlignCenter = array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        )
    );

$styleOutlineBorder = array(
  'borders' => array(
    'outline' => array(
      'style' => PHPExcel_Style_Border::BORDER_THIN,
	  'color' => array('argb' => '00000000')
    )
  )
);

// Remove all border (color white)
$activeSheet->getStyle('A1:Z100')->applyFromArray($styleArray);

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

$activeSheet->getColumnDimension('A')->setWidth(15);
$activeSheet->getColumnDimension('H')->setWidth(15);

// merging title cells
mergeAndCenter('A2', 'B2', $objPHPExcel, $styleAlignCenter);
mergeAndCenter('A3', 'B3', $objPHPExcel, $styleAlignCenter);
mergeAndCenter('D2', 'E2', $objPHPExcel, $styleAlignCenter);
mergeAndCenter('D3', 'E3', $objPHPExcel, $styleAlignCenter);
mergeAndCenter('G2', 'H2', $objPHPExcel, $styleAlignCenter);
mergeAndCenter('G3', 'H3', $objPHPExcel, $styleAlignCenter);
mergeAndCenter('J2', 'K2', $objPHPExcel, $styleAlignCenter);
mergeAndCenter('J3', 'K3', $objPHPExcel, $styleAlignCenter);
mergeAndCenter('M2', 'N2', $objPHPExcel, $styleAlignCenter);
mergeAndCenter('M3', 'N3', $objPHPExcel, $styleAlignCenter);

mergeAndCenter('A6', 'B6', $objPHPExcel, $styleAlignCenter);
mergeAndCenter('A7', 'B7', $objPHPExcel, $styleAlignCenter);
mergeAndCenter('D6', 'E6', $objPHPExcel, $styleAlignCenter);
mergeAndCenter('D7', 'E7', $objPHPExcel, $styleAlignCenter);
mergeAndCenter('G6', 'H6', $objPHPExcel, $styleAlignCenter);
mergeAndCenter('G7', 'H7', $objPHPExcel, $styleAlignCenter);

// client contact
$objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A6', 'CLIENT CONTACT')
            ->setCellValue('D6', 'CONTACT NO.')
            ->setCellValue('G6', 'CONTACT EMAIL');

$objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A7', $post->client->name)
            ->setCellValue('D7', $post->client->phone)
            ->setCellValue('G7', $post->client->email);


// set title styles
for ($i = 0; $i < count($titles); $i++) {
	setStyles($titles[$i], $objPHPExcel);
}

// set values borders
for ($i = 0; $i < count($values); $i++) {
    formatBorders($values[$i], $objPHPExcel);
}

$sections = $post->sections;

$columnSection = 0;
$columnQty = 1;
$columnNotes = 2;
$columnNotesEnd = 6;
$currentRow = 10;

// format sections
foreach ($sections as $sectionRow => $section) {

	$cellSName = PHPExcel_Cell::stringFromColumnIndex($columnSection).$currentRow;
	$cellSQty = PHPExcel_Cell::stringFromColumnIndex($columnQty).$currentRow;
	$cellSNotes = PHPExcel_Cell::stringFromColumnIndex($columnNotes).$currentRow;
	$cellSNotesEnd = PHPExcel_Cell::stringFromColumnIndex($columnNotesEnd).$currentRow;

	$activeSheet->getStyle($cellSName)->getFont()->setBold(true);
	$activeSheet->getStyle($cellSQty)->getFont()->setBold(true);
	$activeSheet->getStyle($cellSNotes)->getFont()->setBold(true);
	setStyles($cellSName, $objPHPExcel);
	setStyles($cellSQty, $objPHPExcel);
	setStyles($cellSNotes, $objPHPExcel);
	$activeSheet->setCellValueByColumnAndRow($columnSection, $currentRow, $section->sectionName);
	$activeSheet->setCellValueByColumnAndRow($columnQty, $currentRow, $section->total);
	$activeSheet->setCellValueByColumnAndRow($columnNotes, $currentRow, 'NOTES');

	// align qty
	$activeSheet->getStyle($cellSQty)->applyFromArray($styleAlignCenter);

    // set notes column borders
	$activeSheet->mergeCells($cellSNotes.':'.$cellSNotesEnd);
	setStyles($cellSNotes, $objPHPExcel);
	setStyles($cellSNotesEnd, $objPHPExcel);
	$activeSheet->getStyle($cellSNotes . ':' . $cellSNotesEnd)->applyFromArray($styleOutlineBorder);

	foreach($section->items as $itemRow => $item) {

		$currentRow++;
		$cellIName = PHPExcel_Cell::stringFromColumnIndex($columnSection).($currentRow);
		$cellIQty = PHPExcel_Cell::stringFromColumnIndex($columnQty).($currentRow);
		$cellINotes = PHPExcel_Cell::stringFromColumnIndex($columnNotes).($currentRow);
		$cellINotesEnd = PHPExcel_Cell::stringFromColumnIndex($columnNotesEnd).($currentRow);

        $activeSheet->setCellValueByColumnAndRow($columnSection, $currentRow, $item->name);
        $activeSheet->setCellValueByColumnAndRow($columnQty, $currentRow, $item->qty);
        $activeSheet->setCellValueByColumnAndRow($columnNotes, $currentRow, $item->notes);
        formatBorders($cellIName, $objPHPExcel);
        formatBorders($cellIQty, $objPHPExcel);

        // align qty
		$activeSheet->getStyle($cellIQty)->applyFromArray($styleAlignCenter);

        // set notes column borders
        $activeSheet->mergeCells($cellINotes.':'.$cellINotesEnd);
        $activeSheet->getStyle($cellINotes . ':' . $cellINotesEnd)->applyFromArray($styleOutlineBorder);

        foreach($item->modifiers as $rowMod => $itemMod) {

        	$currentRow++;
        	$cellMName = PHPExcel_Cell::stringFromColumnIndex($columnSection).($currentRow);
			$cellMQty = PHPExcel_Cell::stringFromColumnIndex($columnQty).($currentRow);
			$cellMNotes = PHPExcel_Cell::stringFromColumnIndex($columnNotes).($currentRow);
			$cellMNotesEnd = PHPExcel_Cell::stringFromColumnIndex($columnNotesEnd).($currentRow);

	        $activeSheet->setCellValueByColumnAndRow($columnSection, $currentRow, $itemMod->name);
	        $activeSheet->getStyle($cellMName)->getFont()->setSize(9);
	        $activeSheet->getStyle($cellMName)->getFont()->setItalic(true);
	        $activeSheet->getStyle($cellMName)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
	        formatBorders($cellMName, $objPHPExcel);
	        formatBorders($cellMQty, $objPHPExcel);

	        $activeSheet->mergeCells($cellMNotes.':'.$cellMNotesEnd);
	        $activeSheet->getStyle($cellMNotes . ':' . $cellMNotesEnd)->applyFromArray($styleOutlineBorder);
        }
	}

	$currentRow += 2;
}

// Rename worksheet
$activeSheet->setTitle('Booking');

function mergeAndCenter($cellStart, $cellEnd, $objExcel, $styleAlignCenter) {

	$objExcel->getActiveSheet()->mergeCells($cellStart.':'.$cellEnd);
	$objExcel->getActiveSheet()->getStyle($cellStart.':'.$cellEnd)->applyFromArray($styleAlignCenter);
}

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