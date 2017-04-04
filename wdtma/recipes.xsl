<?xml version="1.0" encoding="UTF-8"?>

<!--  
Module: Web Data with XML, JSON and AJAX
( Tutor Marked Assignment )
Date: 19 Jan 2017
Student: Pawel Miszkurka
Number: 130007376
-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output 
        method="html" 
        doctype-system="about:legacy-compat" 
        encoding="UTF-8" 
        indent="yes" 
        omit-xml-declaration="yes"/>    
    
    <xsl:template match="/">
        <html>
            <head>
                
                <title>Recipes</title>
                <link rel="stylesheet" type="text/css" href="recipes.css" />
                <meta charset="utf-8" />
               
            </head>
            <body>
                
                <div class="wrapper"><!-- Page wrapper -->
                    
                    <xsl:for-each select="//recipe"> 
                        
                        <xsl:sort select="title"/> 
                        <xsl:sort select="cookingTime"/>
                        
                        <div class="recipe"><!-- Individual recipe -->
                            
                            <div class="image">
                                
                                <xsl:apply-templates select="image"/>
       
                            </div>
                            
                            <h3 class="recipe-title"><xsl:value-of select="title" /></h3>
                            <p><xsl:value-of select="description" /></p>
                            <div class="cooking-information"><!-- Cooking information -->
                                <p><xsl:text>Preparation time: </xsl:text><xsl:value-of select="prepTime" /><xsl:text> minutes</xsl:text></p>
                                <p><xsl:text>Cooking time: </xsl:text><xsl:value-of select="cookingTime" /><xsl:text> minutes</xsl:text>
                                
                                <!-- output based on the cooking time -->
                                <xsl:choose>
                                    <xsl:when test="cookingTime &gt; 60">
                                        <span class="colored"><xsl:text> - Slow Burner</xsl:text></span>
                                    </xsl:when>
									<xsl:when test="cookingTime &lt; 61 and cookingTime &gt; 30">
										<span class="colored"><xsl:text> - Medium Burner</xsl:text></span>
									</xsl:when>
									<xsl:otherwise>
										<span class="colored"><xsl:text> - Quick and Easy</xsl:text></span>
									</xsl:otherwise>

                                </xsl:choose></p>
                                <p><xsl:text>Difficulty: </xsl:text><xsl:value-of select="difficulty" /></p>
                            
                                <xsl:apply-templates select="servings"/>
                            
                            </div>
                        
                            <div class="ingredient-list"><!-- Ingredients list -->
                                
                                <h3 class="ingredients">Ingredients</h3>
                                

                                    <xsl:for-each select="ingredients/ingredient">
                                        <ul>
                                            <li><xsl:value-of select="@amount" />
                                            <xsl:choose>
                                                <xsl:when test="@unit='grams'">
                                                    <xsl:text>g </xsl:text>
                                                </xsl:when>
                                                <xsl:when test="@unit='mills'">
                                                    <xsl:text>ml </xsl:text>
                                                </xsl:when>
                                                <xsl:when test="@unit='teaspoon'">
                                                    <xsl:text>tsp </xsl:text>
                                                </xsl:when>
                                                <xsl:when test="@unit='tablespoon'">
                                                    <xsl:text>tbsp </xsl:text>
                                                </xsl:when>
												<xsl:otherwise>
													<xsl:text> </xsl:text>
												</xsl:otherwise>
                                            </xsl:choose>
                                                <xsl:value-of select="text()" />
                                            </li>
                                         </ul>
                                    </xsl:for-each>
                                    
                            </div>
                        </div>
                    </xsl:for-each>  
                </div>
                
            </body>
        </html>            
    </xsl:template>  
    
    <xsl:template match="image">
        <xsl:element name="img">
            <xsl:attribute name="src">
                <xsl:value-of select="."/>
            </xsl:attribute>
        </xsl:element>  
    </xsl:template>

    <xsl:template match="servings">
        
        <xsl:choose>
            <xsl:when test="@type='slices'">   
                <p><xsl:value-of select="."/></p>
            </xsl:when>
            <xsl:otherwise>
                <p><xsl:text>Serves: </xsl:text><xsl:value-of select="."/></p>
            </xsl:otherwise>
        </xsl:choose> 
        
    </xsl:template>
    
</xsl:stylesheet>