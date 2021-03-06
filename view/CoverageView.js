function CoverageLink ( link ) {
	link.on( 'click', function () {
		var coverage = link.getData();
		var panels = Panels.getView();
		panels.sourceview.load( coverage.file, coverage.lines, false, coverage.fileRel );
	} );
}

function CloseCoverageButton ( button ) {
	button.on( 'click', function () {
		var panels = Panels.getView();
		panels.removeView( panels.sourceview );
		panels.removeView( panels.coverageview );
		panels.setState( 'active', false );
	} );
}

function CoverageButton ( button ) {
	button.on( 'click', function ( e ) {
		var sourceview = new SourceView().setState( 'active' );
		var coverageview = new CoverageView( sourceview, button.getData() );
		var panels = Panels.getView();
		panels.addView( sourceview, 'first' );
		panels.addView( coverageview );
		panels.sourceview = sourceview;
		panels.coverageview = coverageview;
		panels.setState( 'active' );
		e.stopPropagation();
	} );
}

function CoverageView ( sourceview, result ) {
	View.Panel.call( this );
	this.setClass( 'CoverageView' );
	this.setLayout( 'VerticalFlex' );
	this.addView( $T( 'Tmpl.CoverageView', result ) );
	var files = _getCoverageFiles( result, true );
	sourceview.load( result.Script, files.Cov[result.Script], false, files.Rel[result.Script] );
}

CoverageView.extend( View.Panel );